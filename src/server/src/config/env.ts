import dotenv from "dotenv"
dotenv.config()

const CONFIG = {
    SERVER: {
        PORT: process.env.PORT || 8383,
        NODE_ENV: process.env.NODE_ENV || "development",
    }
}

export default CONFIG