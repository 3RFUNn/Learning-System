export const getRandomNumber = (min = 0, max = 1000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getCurrentTerm = () => {
    // Define the start and end dates for each term
    const terms = [
        {
            season: "Spring",
            start: new Date(null, 0, 1),
            end: new Date(null, 4, 31),
        },
        {
            season: "Summer",
            start: new Date(null, 5, 1),
            end: new Date(null, 7, 31),
        },
        {
            season: "Fall",
            start: new Date(null, 8, 1),
            end: new Date(null, 11, 31),
        },
    ];

    // Get the current date using the Date object
    const currentDate = new Date();

    // Find the term that the current date falls within
    const currentTerm = terms.find((term) => {
        const termStart = term.start.setFullYear(currentDate.getFullYear());
        const termEnd = term.end.setFullYear(currentDate.getFullYear());
        return currentDate >= termStart && currentDate <= termEnd;
    });

    // If a term was found, log the current term
    return currentTerm ?? "NoTerm";
};
