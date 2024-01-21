import app from "./middleware.js";
import authorRouter from "./routes/author.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import genreRouter from "./routes/genre.routes.js";
import worksRouter from "./routes/worksRouter.routes.js";
import publisherRouter from "./routes/publisher.routes.js";
const PORT = 8080;

app.use(authorRouter);
app.use(worksRouter);
app.use(collectionRouter);
app.use(genreRouter);
app.use(publisherRouter);

app.listen(PORT, () => {
    console.log(`El servidor Express está funcionando en el puerto ${PORT}`);
});
