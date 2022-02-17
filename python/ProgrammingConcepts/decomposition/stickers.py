from typing import Tuple, List, Set


def harvest_duplicates(collection: List[str]) -> Tuple[List[str], List[str]]:
    """
    Given a collection of stickers, it splits the collection into
    those stickers which are unique, and those which are duplicates
    :param collection: The input collection
    :return: A tuple containing the collection with duplicates removed, and the duplicates
    """
    dedup_collection: List[str] = []
    swaps: List[str] = []

    for sticker in collection:
        if sticker not in dedup_collection:
            dedup_collection.append(sticker)
        else:
            swaps.append(sticker)

    return dedup_collection, swaps


def assign_duplicates(collection: List[str], duplicates: List[str]) -> Tuple[List[str], List[str]]:
    """
    Given a collection, and a list of duplicates, assigns required duplicates into
    the collection.
    :param collection: The collection
    :param duplicates: The list of duplicates
    :return: A tuple of the new collection, and the updated list of duplicates
    """
    new_collection: List[str] = list(collection)
    new_duplicates: List[str] = []

    for duplicate in duplicates:
        if duplicate not in new_collection:
            new_collection.append(duplicate)
        else:
            new_duplicates.append(duplicate)

    return new_collection, new_duplicates


def swap(collections: List[List[str]]) -> List[List[str]]:
    """
    Given a list of sticker collections, this function redistributes duplicates
    between the collections to make each collection as complete as possile.
    :param collections: The list of input collections
    :return: List of output collections, in respective position
    """
    output_collections = []

    # Harvest Duplicates
    collections_minus_duplicates = []
    all_duplicates: List[str] = []
    for collection in collections:
        upd_collection, duplicates = harvest_duplicates(collection)
        collections_minus_duplicates.append(upd_collection)
        all_duplicates.extend(duplicates)

    # Assign Duplicates
    for collection in collections_minus_duplicates:
        upd_collection, all_duplicates = assign_duplicates(collection, all_duplicates)
        output_collections.append(upd_collection)

    return output_collections
