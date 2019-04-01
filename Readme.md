[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![made-with-react](https://img.shields.io/badge/Made%20with-React-1f425f.svg)](https://reactjs.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Database bibliografico e bibliometrico

Si vuole sviluppare una base di dati relazionale, sul modello di servizi quali
[Scopus​](https://www.scopus.com/freelookup/form/author.uri) o [Web of Science​](https://clarivate.com/products/web-of-science/) , in grado di memorizzare informazioni
bibliografiche di base su pubblicazioni scientifiche (autori, titolo, tipo di
contributo, titolo rivista/volume ecc.) e citazioni, in modo da poter
ricostruire la bibliografia di ogni pubblicazione e calcolare parametri
bibliometrici come l'​indice H​ di ogni autore.

Puoi visionare il progetto a questo indirizzo: <https://db-systems-project.herokuapp.com/>

## Tecnologie Utilizzate

### Back End

Ho scelto [**PostgreSQL**](https://www.postgresql.org/) come Database relazionale, costruendo una _RESTful API_ con [**Node.js**](https://nodejs.org/it/), [**Express**](https://expressjs.com/) e [**Sequelize ORM**](http://docs.sequelizejs.com/).

### Front End

Ho sviluppato una _Single Page Application_ utilizzando [**React.js**](https://reactjs.org/) e [**React Materialize**](https://github.com/react-materialize/react-materialize), seguendo le best practices di _UI_/_UX_ apprese durante l'esame di _Human Computer Interaction_.

## Progettazione

### Class Diagram

<img src="./.github/cd.png" alt="Class Diagram" width=512>

### Class Diagram Ristrutturato

<img src="./.github/cd_ristrutturato.png" alt="Class Diagram" width=512>
