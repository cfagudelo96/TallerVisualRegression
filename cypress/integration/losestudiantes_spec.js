describe('Los estudiantes login', function() {
    it('Visits los estudiantes and fails at login', function() {
        cy.visit('https://losestudiantes.co');
        cy.screenshot();
        cy.contains('Cerrar').click();
        cy.contains('Ingresar').click();
        cy.get('.cajaLogIn').find('input[name="correo"]').click().type("wrongemail@example.com");
        cy.get('.cajaLogIn').find('input[name="password"]').click().type("1234");
        cy.get('.cajaLogIn').contains('Ingresar').click();
        cy.contains('El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.');
        cy.screenshot();
    });
});

var registrarUsuario = function(identificador) {
    cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Pepe Bot");
    cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("#" + identificador);
    cy.get('.cajaSignUp').find('input[name="correo"]').click().type("pepebot" + identificador + "@test.com");
    cy.get('.cajaSignUp').contains('Estudio una maestria').click();
    cy.get('.cajaSignUp').find('select[name="idPrograma"]').select('Maestría en Ingeniería de Software');
    cy.get('.cajaSignUp').find('input[name="password"]').click().type(identificador);
    cy.get('.cajaSignUp').find('input[name="acepta"]').click();
    cy.contains('Registrarse').click();
};

describe('Los estudiantes login exitoso', function() {
    it('Visita los estudiantes, crea una cuenta y hace login', function() {
        cy.visit('https://losestudiantes.co');
        cy.screenshot();
        cy.contains('Cerrar').click();
        cy.contains('Ingresar').click();
        cy.get('.cajaLogIn').find('input[name="correo"]').click().type("testcfagudelo12@test.com");
        cy.get('.cajaLogIn').find('input[name="password"]').click().type("testcfagudelo12");
        cy.get('.cajaLogIn').contains('Ingresar').click();
        cy.screenshot();
    });
});

describe('Los estudiantes sign up fallido', function() {
    it('Visita los estudiantes y trata de crear una cuenta repetida', function() {
        cy.visit('https://losestudiantes.co');
        cy.screenshot();
        cy.contains('Cerrar').click();
        cy.contains('Ingresar').click();
        cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("Carlos");
        cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Agudelo");
        cy.get('.cajaSignUp').find('input[name="correo"]').click().type("cf.agudelo12@uniandes.edu.co");
        cy.get('.cajaSignUp').contains('Estudio una maestria').click();
        cy.get('.cajaSignUp').find('select[name="idPrograma"]').select('Maestría en Ingeniería de Software');
        cy.get('.cajaSignUp').find('input[name="password"]').click().type("testmiso4208");
        cy.get('.cajaSignUp').find('input[name="acepta"]').click();
        cy.contains('Registrarse').click();
        cy.contains('Ya existe un usuario registrado con el correo');
        cy.screenshot();
    });
});

function buscarProfesor(nombre) {
    cy.get('div.Select-control input').type(nombre, {force: true});
}

describe('Los estudiantes buscar profesor', function() {
    it('Visita los estudiantes y busca un profesor', function() {
        cy.visit('https://losestudiantes.co');
        cy.screenshot();
        cy.contains('Cerrar').click();
        buscarProfesor('Mario Linares Vasquez');
        cy.screenshot();
    });
});

describe('Los estudiantes ir pagina profesor', function() {
    it('Visita los estudiantes y ve la pagina de un profesor', function() {
        cy.visit('https://losestudiantes.co');
        cy.screenshot();
        cy.contains('Cerrar').click();
        cy.get('.profesor').first().click();
        cy.screenshot();
    });
});

describe('Los estudiantes filtrar pagina profesor', function() {
    it('Visita los estudiantes, ve la pagina de un profesor y filtra', function() {
        cy.visit('https://losestudiantes.co');
        cy.screenshot();
        cy.contains('Cerrar').click();
        cy.get('.profesor').first().click();
        cy.get('.materias').then(function() {
            cy.get('.materias').get('.labelHover').find('input[type="checkbox"]').click({multiple: true});
        });
        cy.screenshot();
    });
});
