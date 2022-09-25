export const toAllTodos = (snapshot) => {
    return snapshot.docs.map(doc => {
        const todo = doc.data()
        return {
            ...todo,
            id: doc.id,
        }
    })
}