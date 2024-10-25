const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let orders = []; 

class CarWash {
    getDescription() {
        return 'Basic Car Wash';
    }

    cost() {
        return 0; 
    }
}

class SimpleWashDecorator {
    constructor(carWash) {
        this.carWash = carWash;
    }

    getDescription() {
        return this.carWash.getDescription() + ', Lavado sencillo';
    }

    cost() {
        return this.carWash.cost() + 5; 
    }
}

class WaxDecorator {
    constructor(carWash) {
        this.carWash = carWash;
    }

    getDescription() {
        return this.carWash.getDescription() + ', Cera';
    }

    cost() {
        return this.carWash.cost() + 5; 
    }
}

class InteriorCleaningDecorator {
    constructor(carWash) {
        this.carWash = carWash;
    }

    getDescription() {
        return this.carWash.getDescription() + ', Limpieza interior';
    }

    cost() {
        return this.carWash.cost() + 8; 
    }
}

class TireWashDecorator {
    constructor(carWash) {
        this.carWash = carWash;
    }

    getDescription() {
        return this.carWash.getDescription() + ', Lavado de llantas';
    }

    cost() {
        return this.carWash.cost() + 3; 
    }
}

class EngineCleaningDecorator {
    constructor(carWash) {
        this.carWash = carWash;
    }

    getDescription() {
        return this.carWash.getDescription() + ', Limpieza de motor';
    }

    cost() {
        return this.carWash.cost() + 12; 
    }
}

class UnderbodyWashDecorator {
    constructor(carWash) {
        this.carWash = carWash;
    }

    getDescription() {
        return this.carWash.getDescription() + ', Lavado de chasis';
    }

    cost() {
        return this.carWash.cost() + 7; 
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/order', (req, res) => {
    let carWash = new CarWash();

    if (req.body.simpleWash) {
        carWash = new SimpleWashDecorator(carWash);
    }
    if (req.body.wax) {
        carWash = new WaxDecorator(carWash);
    }
    if (req.body.interiorCleaning) {
        carWash = new InteriorCleaningDecorator(carWash);
    }
    if (req.body.tireWash) {
        carWash = new TireWashDecorator(carWash);
    }
    if (req.body.engineCleaning) {
        carWash = new EngineCleaningDecorator(carWash);
    }
    if (req.body.underbodyWash) {
        carWash = new UnderbodyWashDecorator(carWash);
    }

    
    orders.push({
        owner: req.body.owner,
        brand: req.body.brand,
        model: req.body.model,
        plate: req.body.plate,
        color: req.body.color,
        serviceDescription: carWash.getDescription(),
        totalCost: carWash.cost()
    });

    res.send(`Servicio: ${carWash.getDescription()}<br> Total: $${carWash.cost()}<br><br>
        <a href="/">Realizar Otro Pedido</a><br>
        <a href="/orders">Ver Historial de Lavados</a>`);
});

app.get('/orders', (req, res) => {
    let html = '<h1>Historial de Lavados</h1>';
    orders.forEach((order, index) => {
        html += `<h3>Pedido #${index + 1}</h3>
            <p>Propietario: ${order.owner}</p>
            <p>Marca: ${order.brand}</p>
            <p>Modelo: ${order.model}</p>
            <p>Placa: ${order.plate}</p>
            <p>Color: ${order.color}</p>
            <p>Servicios: ${order.serviceDescription}</p>
            <p>Costo Total: $${order.totalCost}</p>`;
    });

    html += '<br><a href="/">Volver al Inicio</a>';
    res.send(html);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
