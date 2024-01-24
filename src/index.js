import app from "./middleware.js";
import authorRouter from "./routes/author.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import genreRouter from "./routes/genre.routes.js";
import worksRouter from "./routes/works.routes.js";
import publisherRouter from "./routes/publisher.routes.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SERVER_PORT;

app.use(authorRouter);
app.use(worksRouter);
app.use(collectionRouter);
app.use(genreRouter);
app.use(publisherRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
