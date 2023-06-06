const shuffle = () => {
    return [1,2]
        .sort(() => Math.random() - 0.5)[0]
}

export default shuffle;