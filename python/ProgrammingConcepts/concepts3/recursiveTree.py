import turtle


def draw_branch(t: turtle.Turtle, length: float, depth: int = 0):
    t.forward(length)
    print("Turtle depth {} now at {} pointing {}".format(depth, t.pos(), t.heading()))

    if length > 50:
        new_length: float = length * 0.8

        t1: turtle.Turtle = turtle.Turtle()
        t1.penup()
        t1.setpos(t.pos())
        t1.setheading(t.heading() + 30)
        t1.pendown()
        draw_branch(t1, new_length, depth + 1)

        t2: turtle.Turtle = turtle.Turtle()
        t2.penup()
        t2.setpos(t.pos())
        t2.setheading(t.heading() - 30)
        t2.pendown()
        draw_branch(t2, new_length, depth + 1)


root = turtle.Turtle()
turtle.mode("logo")
draw_branch(root, 100.0, 0)

turtle.done()