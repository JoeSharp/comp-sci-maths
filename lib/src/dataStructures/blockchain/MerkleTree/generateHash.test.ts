import { generateSha256 } from "./generateHash"

describe("SHA 256", () => {
    // https://gchq.github.io/CyberChef/#recipe=SHA2('256',64,160)&input=aGVsbG8KXQ
    test("Simple String", () => {
        const result = generateSha256('hello');
        expect(result).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
    })

    test("Fresh", () => {
        const result = generateSha256(`Now this is the story all about how
My life got flipped, turned upside down
And I'd like to take a minute just sit right there
I'll tell you how I became the prince of a town called Bel Air
In west Philadelphia born and raised
On the playground where I spent most of my days
Chilling out, maxing, relaxing all cool
And all shooting some b-ball outside of the school
When a couple of guys who were up to no good
Started making trouble in my neighborhood
I got in one little fight and my mom got scared
And said you're moving with your auntie and uncle in Bel Air
I begged and pleaded with her the other day
But she packed my suitcase and sent me on my way
She gave me a kissin' and she gave me my ticket
I put my Walkman on and said I might as well kick it
First class, yo this is bad,
Drinking orange juice out of a champagne glass
Is this what the people of Bel Air livin' like
Hm this might be alright!
I whistled for a cab and when it came near the
License plate said 'Fresh' and had dice in the mirror
If anything I could say that this cab was rare
But I thought now forget it, yo home to Bel Air
I pulled up to a house about seven or eight
And I yelled to the cabbie, yo Holmes smell ya later
Looked at my kingdom I was finally there
To sit on my throne as the prince of Bel Air`)
        expect(result).toBe('3806203b5be7185ab6a8040e6ada24e2e2219711a07af9723c57ac6c8e90e9a7')
    })
})