const dotenv = require('dotenv');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDatabase = require("./config/database");
const Data = require("./models/dataModel");

process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting Down The Server due to uncaught error`);
    process.exit(1);
})

dotenv.config({ path: "./config/config.env" });
connectDatabase();


const httpSerevr = createServer(app);
const io = new Server(httpSerevr, { cors: {} , maxHttpBufferSize: 1e8 });

io.on("connection", (socket) => {
    console.log(`Connection successful : ${socket.id}`);

    socket.on("form_submit", async (data) => {
        console.log(data);
        const user = await Data.create({ name: data.name, url: data.img_gen_url });
        const allData = await Data.find();
        socket.broadcast.emit("render_response", allData);
        socket.emit("render_response", allData);
        socket.emit("create_response", user);
    });

    socket.on("update_form", async (data) => {
        let user = await Data.findById(data.id);
        if (!user) {
            socket.emit("update_response", {
                status: 404,
                message: "Product Not Found ",
            })
            return;
        }
        user = await Data.findByIdAndUpdate(data.id, { name: data.name });

        const allData = await Data.find();
        socket.broadcast.emit("render_response", allData);
        socket.emit("render_response", allData);

        socket.emit("update_response", {
            status: 201,
            message: "Product updated Successfully",
        })
    })



    socket.on("delete_form", async (data) => {
        let user = await Data.findById(data.id);
        if (!user) {
            socket.emit("delete_response", {
                status: 404,
                message: "Data Not Found ",
            })
            return;
        }
        user = await Data.findByIdAndDelete(data.id);

        const allData = await Data.find();
        socket.broadcast.emit("render_response", allData);
        socket.emit("render_response", allData);

        socket.emit("delete_response", {
            status: 201,
            message: "Product Deleted Successfully",
        })
    })


    socket.on("AddImage", async (data) => {
        const { url, id } = data;
        let user = await Data.findById(id);
        if (!user) {
            socket.emit("AddImage_response", {
                status: 404,
                message: "Data Not Found ",
            })
            return;
        }
        let urls = user.url ;
        urls.push(url);
        user = await Data.findByIdAndUpdate(id , {url:urls});

        const allData = await Data.find();
        socket.broadcast.emit("render_response", allData);
        socket.emit("render_response", allData);

        socket.emit("AddImage_response" , {
            status:201 ,
            message : "Image Added Successfully" ,
        })
    })
});


httpSerevr.listen(process.env.PORT, () => {
    console.log(`App is listening port : ${process.env.PORT}`);
})

process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down The Server due to Unhandled Promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})