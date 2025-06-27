import app from "./main";


const startServer = async () => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}

startServer();