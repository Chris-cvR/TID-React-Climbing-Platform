


const readTodos = async function () {
    // Reading parse objects is done by using Parse.Query
    const parseQuery = new Parse.Query('Todo');
    try {
        let todos = await parseQuery.find();
        // Be aware that empty or invalid queries return as an empty array
        // Set results to state variable
        setReadResults(todos);
        return true;
    } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error! ${error.message}`);
        return false;
    };
};