from __future__ import annotations
from typing import List, Dict, Optional, Tuple
from TheoryOfComputation.BackusNaurForm.Tree import Tree
from Algorithms.Queue.QueueImpl import Queue, QueueImpl

RulePart = Tuple[bool, str]
Rule = List[RulePart]
MatchPart = Tuple[str, str]


GIVEN_BY: str = '::='
OR: str = '|'


class BackusNaurForm:
    """
    An instance of this class can be used to store a set of rules for a particular BNF definition.
    It can then be used to validate any number of strings against that definition.
    """

    # These are the definitions within this form.
    # The key here is the name of the meta-tag, each meta-tag will have a list of alternative rules (OR)
    # which count as a match.
    # Each rule consists of a series of parts, some are literal values and others are meta-tags which means
    # the validation has to recurse.
    __rules: Dict[str, List[Rule]] = dict()

    def __repr__(self):
        as_str: str = "Backus-Naur Form{}"
        for name, alternative_rules in self.__rules.items():
            for rule in alternative_rules:
                as_str += "\n\t{}: ".format(name)
                for is_tag, value in rule:
                    as_str += "<{}>, ".format(value) if is_tag else "'{}',".format(value)
        return as_str

    @staticmethod
    def __parse_alternative(alternative_str) -> Rule:
        """
        Given one of the expressions within a definition, parses the components of the rule.
        :param alternative_str: The raw string
        :return: The parsed Rule Parts list
        """
        # Work through character by character adding rule parts as various special chars are hit
        # This could probably be done better with RegEx...
        form: List[RulePart] = []
        is_building_tag: bool = False
        is_building_literal: bool = False
        current_literal: str = ""
        for c in alternative_str:
            if c == "<":
                if is_building_literal:
                    current_literal += c
                else:
                    # If we have any accumulated literal, just add as a literal part
                    if len(current_literal) > 0:
                        form.append((False, current_literal))
                        current_literal = ""

                    # Register the fact we are building a tag
                    is_building_tag = True
            elif c == ">":
                # If we aren't already building a tag, assume this close bracket is a literal
                if not is_building_tag:
                    current_literal = ">"
                else:
                    # Otherwise we can just close the tag and add the new tag rule part
                    is_building_tag = False
                    form.append((True, current_literal))
                    current_literal = ""
            elif c == "'":
                # If we are not already within quotes, but have accumulated some literal value
                # Add whatever value is accumulated as a literal and start again
                if not is_building_literal:
                    if len(current_literal) > 0:
                        form.append((False, current_literal))
                        current_literal = ""
                # If we are building a literal, then this is assumed to close it
                if is_building_literal:
                    form.append((False, current_literal))
                    current_literal = ""
                is_building_literal = not is_building_literal
            else:
                # Any other character just gets appended to current literal
                current_literal += c

        # Any hanging literal should be added
        if len(current_literal) > 0:
            form.append((False, current_literal))

        # Assume unterminated opening tag is due to opening tag actually being literal
        if is_building_tag:
            form.append((False, "<"))

        return form

    def add_rule(self, rule_str: str) -> BackusNaurForm:
        """
        Add a line from a BNF definition to this definition

        :param rule_str: The line containing the rule for a particular type
        :return: This object, to allow method chaining
        """
        # Separate out the name of the definition from what it is given by
        outer_parts = [x.strip() for x in rule_str.split(GIVEN_BY)]
        if len(outer_parts) != 2:
            raise Exception("Could not parse {}, unexpected number of parts divided by {}".format(
                rule_str,
                GIVEN_BY
            ))
        rule_name: str = outer_parts[0].strip()[1:-1]

        # Separate out all the alternatives using the OR delimiter
        alternatives_str: List[str] = [x.strip() for x in outer_parts[1].split(OR)]

        alternatives: List[Rule] = []
        for alternative_str in alternatives_str:
            form: List[RulePart] = BackusNaurForm.__parse_alternative(alternative_str)
            alternatives.append(form)

        self.__rules[rule_name] = alternatives
        return self

    def __check_value_against_rule_part(self,
                                        input_str: str,
                                        from_index: int,
                                        to_index: int,
                                        rule_name: str,
                                        rule_part: RulePart) -> Optional[Tree[MatchPart]]:
        """
        Given some portion of the input string, this function attempts to match that portion
        with a given Rule Part. The portion of string must entirely satisfy the rule part for
        this function to return a tree.
        If the given rule part is a meta-tag, it recurses into __check_value_against_rule to check the string against
        that entire rule.

        :param input_str: The entire input string
        :param from_index: The index from which we are to try and match
        :param to_index: The index up to which we are trying to match
        :param rule_part: The rule part we are attempting to satisfy
        :return: A tree containing all the sub matches thus far, if the matches consume the string
        """
        is_tag, rule_value = rule_part
        if is_tag:
            # Locate the rule for the given meta-tag
            sub_rule_alternatives: List[Rule] = self.__rules[rule_value]
            if sub_rule_alternatives is None or len(sub_rule_alternatives) == 0:
                raise Exception("Cannot find any rules for {}".format(rule_value))

            # Work through the alternatives, recursing into __check_value_against_rule
            for sub_rule in sub_rule_alternatives:
                match: Optional[Tree[MatchPart]] = \
                    self.__check_value_against_rule(input_str, from_index, to_index, rule_value, sub_rule)
                if match is not None:
                    return match

        elif rule_value == input_str[from_index:to_index]:
            return Tree((rule_name, input_str[from_index:to_index]))

        return None

    def __check_value_against_rule(self,
                                   input_str: str,
                                   from_index: int,
                                   to_index: int,
                                   rule_name: str,
                                   rule: Rule) -> Optional[Tree[MatchPart]]:
        potential_return: Tree[MatchPart] = Tree((rule_name, input_str[from_index:to_index]))

        """
        This function attempts to match a given portion of the input string against an entire rule.
        It must iterate through all the parts of the rule, greedily attempting matches.
        If the entire string portion is consumed by all of the rule parts, this is considered a match.

        :param input_str: The entire input string being validated
        :param from_index: The index from which to check
        :param to_index: The end index to which we check
        :param rule: The rule we are trying to satisfy.
        :return: A tree of the rule matches, if this rule has completely matched the string portion
        """
        # Build a Queue of Rule Parts to satisfy
        rule_part_q: Queue[RulePart] = QueueImpl()
        for rule_part in rule:
            rule_part_q.enqueue(rule_part)

        # While there are rule parts to satisfy...
        while not rule_part_q.is_empty():
            rule_part = rule_part_q.dequeue()

            # Match the rule part against as much of the remaining string as possible
            temp_to_index: int = to_index
            match_found: bool = False

            # While there is any remaining string to try and match
            while temp_to_index > from_index and not match_found:
                # Attempt a match at this rule part
                match: Optional[Tree[MatchPart]] = \
                    self.__check_value_against_rule_part(
                        input_str,
                        from_index,
                        temp_to_index,
                        rule_name,
                        rule_part)
                if match is not None:
                    # If this is a sub tag rule part, add to the tree to return
                    # Otherwise its a literal match, and the tree created in this function will already serve
                    if rule_part[0]:
                        potential_return.add_child(match)
                    # The next rule needs to match 'from' the end of the string we just matched against
                    from_index = temp_to_index
                    match_found = True
                else:
                    # Take one character off the end
                    temp_to_index -= 1

            if not match_found:
                return None

        # If we satisfied all the rule parts AND consumed the whole string, this is a match
        return potential_return if rule_part_q.is_empty() and from_index == to_index else None

    def find_match(self, input_str: str) -> Optional[Tree[MatchPart]]:
        """
        Given an input string, this attempts to find a named BNF meta tag that matches.

        :param input_str: The string to validate
        :return: The name of the matching data type, or None if there is no match
        """
        for name, alternative_rules in self.__rules.items():
            for rule in alternative_rules:
                part: Optional[Tree[MatchPart]] = \
                    self.__check_value_against_rule(input_str, 0, len(input_str), name, rule)
                if part is not None:
                    return part
        return None
