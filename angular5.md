# Curso Angular 2

<!-- TOC -->

- [Curso Angular 2](#curso-angular-2)
    - [Instalación y creación de un proyecto](#instalación-y-creación-de-un-proyecto)
        - [Creación de un proyecto](#creación-de-un-proyecto)
    - [Arquitectura Angular](#arquitectura-angular)
        - [`index.html`](#indexhtml)
        - [Componente principal](#componente-principal)
        - [Metadatos de un componente](#metadatos-de-un-componente)
        - [Interpolación](#interpolación)
        - [Trabajo con componentes](#trabajo-con-componentes)
            - [app.module.ts](#appmodulets)
            - [Creación de templates y styles inline](#creación-de-templates-y-styles-inline)
        - [Ciclo de vida de un componente](#ciclo-de-vida-de-un-componente)
            - [ngOninit](#ngoninit)
            - [ngOnChanges](#ngonchanges)
        - [Directivas](#directivas)
            - [Colecciones de elementos (Arrays) y directiva *ngFor](#colecciones-de-elementos-arrays-y-directiva-ngfor)
            - [*ngIf y "else"](#ngif-y-else)
        - [Property Binding](#property-binding)
            - [[class]](#class)
            - [Interpolación con variables en el template](#interpolación-con-variables-en-el-template)
        - [Pipes](#pipes)
            - [Custom Pipes](#custom-pipes)
            - [Pipe async](#pipe-async)
        - [Intercambio de información entre componentes](#intercambio-de-información-entre-componentes)
            - [@Input](#input)
            - [@Output](#output)
        - [Inyección de dependencias](#inyección-de-dependencias)
        - [Observables en Angular](#observables-en-angular)
        - [Promesas](#promesas)
        - [Enrutamiento](#enrutamiento)
            - [Navegación desde código](#navegación-desde-código)
        - [Modularización de la aplicación](#modularización-de-la-aplicación)
        - [Entradas de datos](#entradas-de-datos)
        - [Formuarios](#formuarios)
            - [Formuarios reactivos](#formuarios-reactivos)
            - [ViewChildren / ViewChild](#viewchildren--viewchild)
            - [FormBuilder con validadores](#formbuilder-con-validadores)
            - [Carga de los datos en un formulario](#carga-de-los-datos-en-un-formulario)
            - [Suscripción para suscribir a las modificaciones de los campos del formulario](#suscripción-para-suscribir-a-las-modificaciones-de-los-campos-del-formulario)
        - [Servicios GUARD](#servicios-guard)
        - [Debug](#debug)
        - [Patrón redux / ngrx](#patrón-redux--ngrx)
            - [Uso básico de Redux](#uso-básico-de-redux)
        - [Testing en Angular](#testing-en-angular)
            - [TDD: Test Driven Developer](#tdd-test-driven-developer)
            - [Implementación de test unitario de un componente](#implementación-de-test-unitario-de-un-componente)
            - [Implementación de test unitario de un servicio](#implementación-de-test-unitario-de-un-servicio)
        - [Interceptores](#interceptores)
        - [Despliegue de una aplicación (Deploy)](#despliegue-de-una-aplicación-deploy)
            - [Lazy loading](#lazy-loading)
    - [angular-cli](#angular-cli)
        - [Generación](#generación)
    - [Referencias oficiales y enlaces](#referencias-oficiales-y-enlaces)
        - [Librerías](#librerías)

<!-- /TOC -->

## Instalación y creación de un proyecto

Instalamos angular de manera global en el sistema **teniendo instalado antes nodejs**:
````bash
npm install -g @angular/cli
````

### Creación de un proyecto

````bash
ng new my-app
````

Ejecutamos la aplicación con el servidor que nos suministra Angular
````bash
cd my-app
ng serve --open
````

o también
````
npm start
````

## Arquitectura Angular

### `index.html`

Es un conjunto de módulos que dentro de cada uno hay una serie de componentes.

````html
<base href="/">
````

Todos los vínculos que pongamos en la aplicación partirán de `/`

### Componente principal

````html
<app-root></app-root>
````
Sería la etiqueta asignada a un componente de Angular. En el `index.html` principal de la aplicación **sólo puede haber un componente principal**, lo que quiere decir que sólo hay un `tag` que referencia a este componente principal.

En `app.module.ts` está la definición de los componentes de la aplicación. 

### Metadatos de un componente

````javascript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
````

* **selector**: Tag del componente, es decir, es el tag de html asignado para este componente a la hora de referenciarlo en un template.
* **templateUrl**: Nombre y localización del componente.
* **styleUrls**: Nombre y localización de los estilos CSS del componente.

### Interpolación

Acceso o interpolación del contenido de una variable de una clase de un componente desde un template por medio de las dobles llaves `{{nombre_variable}}`. Es unidireccional, es decir sólo carga los datos de la variable de la clase y se visualiza en el template, y no al revés.

````
{{title}}
````
Carga el contenido de la variable `title` del componente.

### Trabajo con componentes

Cada vez que creamos un nuevo componente `nombre.component.ts` hay que referenciarlo en el módulo principal `app.module.ts`.

**Cada componente sólo puede pertenecer a un módulo.**

Generación de un componente en una carpeta:
````bash
ng generate component app/components/second-component
````

Una vez referenciado el componente en el `app.module.ts`, podremos

#### app.module.ts
````javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HolaMundoComponent} from '../components/hola-mundo.component';

@NgModule({
  declarations: [
    AppComponent,
    HolaMundoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HolaMundoComponent]
})
export class AppModule { }
````

* **bootstrap**: Referenciamos el componentes que se ejecuta al iniciar el módulo principal, aunque pueden ser varios componentes, de ahí que sea un array.
* **declarations**: Todos los componentes que forman parte del módulo.
* **imports**: Para importar los módulos que necesitemos, internos de Angular o externos propios necesarios para la aplicación.
  * **BrowserModule**: Módulo de Angular para la introducción de tags especiales en las plantillas.
  * **providers**: Array para cargar los servicios de nuestra aplicación.

Todas las clases de los componentes, para que se puedan usar en otros componentes o en otros lugares de la aplicación hay que exportar esa clase con la palabra reservada **`export`**.

Antes de usar cada uno de los componentes y agregarlo al apartado **declarations**, hay que importar el fichero del lugar en el que esté.

````javascript
import {HolaMundoComponent} from '../components/hola-mundo.component';
````

#### Creación de templates y styles inline

Usando las el carácter `\``, se pueden poner estilos en línea sin tener que concatenar strings.

````javascript
...
@Component({
    selector: 'hola-mundo',
    template: `
    <h1>{{titulo}}</h1>
    <div class="hola-mundo">
        <p>Esta es una prueba de componente insertado.</p>
    </div>`,
    styles: [`
    .hola-mundo {
        color: green;
        font-size: 1.3em;
        font-style: bold;
    }`]
})
...
````

### Ciclo de vida de un componente

#### ngOninit

Este es el primer método que se ejecuta en un componente. Se usa para llamar a métodos que queremos que se ejecuten al comienzo de la llamada a la clase. Cuando se ejectua el DOM está totalmente cargado.

````javascript
import { Component, OnInit } from '@angular/core';
...
export class PersonaComponent implements OnInit{
    ngOninit(){
        this.actualizarDatos("Mauricio", 44);
    }

    actualizarDatos(let nombre: string, let edad: number){
        this.nombre = nombre;
        this.edad = edad;
    }
}
````

#### ngOnChanges

Se ejecuta cada vez que se modifica alguna propiedad del componente.

### Directivas

#### Colecciones de elementos (Arrays) y directiva *ngFor

````javascript
...
constructor() {
    this._alumnos = [
      new Alumno("Mauri",18,"Angular"), 
      new Alumno("Mauri2",19,"Angular2"),
      new Alumno("Mauri3",20,"Angular3"),
      new Alumno("Mauri4",21,"Angular4"),
    ]
  }
...
````
Luego para reproducirlo en la plantilla
````html
<ul>
  <li *ngFor="let alumno of _alumnos; index as i; first as primero;">
    {{i+1}} - {{primero}} - Nombre: {{alumno.nombre}} // Edad: {{alumno.edad}} // Curso: {{alumno.curso}}
  </li>    
</ul> 
````

#### *ngIf y "else"

Con el `then` nombramos el bucle `ng-template` que se mostrará cuando **no se cumpla** la condición.

````html
<ul *ngIf="_verListado">
  <li *ngFor="let alumno of _alumnos; index as i; first as primero; last as ultimo">
    {{i+1}} - {{primero}} - {{ultimo}} - 
    <span *ngIf="primero;else losdemas" class="textoRojo">
        Nombre: {{alumno.nombre}} // Edad: {{alumno.edad}} // Curso: {{alumno.curso}}
    </span>
    <ng-template #losdemas>
        Nombre: {{alumno.nombre}} // Edad: {{alumno.edad}} // Curso: {{alumno.curso}}
    </ng-template>
  </li>    
</ul>
````

Controlar un botón para mostrar o ocultar el resultado
````html
<p *ngIf="_verListado === false">
  <button (click)="verResultado();">Ver resultado</button>
</p>
<p *ngIf="_verListado === true">
  <button (click)="verResultado();">Ocultar resultado</button>
</p>
````

### Property Binding

Diferentes comunicaciones entre partes de Angular

* **(click)="metodo()"** Eventos del tempalte a la lógica en la clase.
* **{{interpolación}}**: Lógica al template
* **[(ngModel)]**: Bidireccional del template a la lógica y al revés.
* **[class]**: Properti binding -> Pasamos información de la lógica al template

Se pone entre corchetes para pasar información 

#### [class]

Si es el primer elemento se le aplica la clase `textoRojo`:
````html
Resultados de alumnos:
<ul *ngIf="_verListado">
  <li *ngFor="let alumno of _alumnos; index as i; first as primero; last as ultimo">
    <span [class.textoRojo] = "primero">
      {{i+1}} - {{primero}} - {{ultimo}} - 
      Nombre: {{alumno.nombre}} // Edad: {{alumno.edad}} // Curso: {{alumno.curso}}
    </span>    
  </li>    
</ul>
````

#### Interpolación con variables en el template

Primero declaramos una variable que llenaremos en el campo de texto:
````javascript
private _nombreUsuario: string;
````
````html
<p>
    <input type="text" #nombre placeholder="Nombre Alumno">
    <button (click)="nombreUsuario = nombre.value">Mostrar Nombre</button>
    Visualizado por: {{nombreUsuario}}
</p>
````

### Pipes

Filtros para formatear la salida de datos en las plantillas. No modifican el dato, sólo a la hora de mostrarlo. 

Se pueden encadenar varios pipes.

#### Custom Pipes

Creación de un filtro que sustituye un caracter dado como parámetro en el filtro con espacios:

`convert-to-spaces.pipe.ts`
````typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpaces'
})

export class ConvertToSpacesPipe implements PipeTransform {

  transform(value: any, character: string): any {
    return value.replace(character, ' ');
  }

}
````

Luego para usarlo en la plantilla. El parámetro se pasa poniendo ":" y después con comillas:
````html
<td>{{product.code | convertToSpaces: '-'}}</td>
````

#### Pipe async

El envío a la plantilla es asíncrono. Una forma de sustituir la recepción de datos de un observable, delegando la asincronía al pipe async en vez de a la lógica de la clase.

### Intercambio de información entre componentes

#### @Input

Queremos renderizar las estrellas de un ranking que es un componente propio de cada uno de los registros donde está el dato numérico del ranking.

En la plantilla origen del modelo, pasamos como parámetro a la etiqueta del componente hijo (`<app-star></app-star>`):

`product-list.component.ts` (componente padre):
````html
<td><app-star [rating]="product.rating"></app-star></td>
````

Luego en el componente hijo (`star.component.ts`) creamos el decorador `@Input` con el nombre de la variable que recogerá el parámetro pasado por el padre.
````typescript
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Input() rating: number;
````

#### @Output

Creación de un evento click, que pasa una llamada de un evento al componente padre:

* **Componente padre**: `product-list.component.ts`
* **Componente hijo**: `star.component.ts`

En el componente hijo usamos del decorador `@Output` creamos una variable de tipo `EventEmitter<type>` y la tipamos con el tipo de variable que se va a pasar, y en el template creamos el evento que usaremos para crear el evento de tipo `EventEmitter` que pasará la variable:


`star.component.html`
````html
<div (click)="onClick()">

````

`star.component.ts`
````typescript
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  ...
})

export class StarComponent implements OnInit, OnChanges {
  @Output() ratingClicked: EventEmitter<any>;
  ...
````

Luego en el componente padre recogemos el evento creado `ratingClicked` y se lo asignamos a un método de la clase padre con la palabra reservada `$event` que captura los datos del evento, por ejemplo, changeView($event)

`product-list.component.html`
```html
<app-star [rating]="product.rating" (ratingClicked)="changeView($event)"></app-star>
```

`product-list.component.ts`
```typescript
...
changeView(data: any) {
    console.log('data: ', data);
    this.shotTitle = data.show;
    return this.shotTitle;
}
...
```

### Inyección de dependencias

Creamos un servicio:

`product.service.ts`
````typescript
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  // Declaración de una constante de clase
  static readonly IMAGETEMP: string = '';

  constructor(
    private _http: HttpClient
  ) { }

  getProducts(): Array<IProduct> {
    // Nos devuelve un orbservable
    // this._http.get('./api/products/products.json')
    return null;
  }
}
````

Luego lo inyectamos en el constructor como parámetro y tipado de la clase donde lo vayamos a usar. Al estar inyectado como dependencia, ya no necesitamos instanciar la clase del servicio.

`product-list.component.ts`
````typescript
import { ProductService } from './product.service';

export class ProductListComponent implements OnInit {
  ...
  // Inyección de dependencias que inyectamos del servicio
  // y no hace falta instanciarlo al ser un servicio y haberlo inyectado.
  constructor(private _productService: ProductService) {
````

### Observables en Angular

* http://blog.enriqueoriol.com/2017/05/comunicacion-servicio-componente-en-angular.html

El agente se suscribe a la línea de tiempo, hasta que nos dessuscribimos o la aplicación termina. Cada vez que llega un evento a esta línea de tiempo, nos avisa y podemos hacer una acción. Los datos que nos llegan del evento pueden llegar en formato raw o los podemos modificar para que nos lleguen como los necesitamos.

**Hasta que no nos suscribimos no se ejecuta nada**

Los procesos que haya que ejecutar con los datos que se van a recibir del observable, tendremos que esperar a los datos, por lo que tendrán que estar dentro de la recepción de los mismos.

`app.module.ts`
````typescript
import { HttpClientModule } from '@angular/common/http';
...
@NgModule({
  ...
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
````

Creas la línea de tiempo (Observable) para que luego desde los componentes se puedan suscribir para recibir los diversos eventos que sucedan.

`product.service.ts`
````typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  // Declaración de una constante de clase
  static readonly IMAGETEMP: string = '';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    // Nos devuelve un orbservable que tenemos que castear para que tengamos los datos como necesitamos
    return this._http.get<IProduct[]>('./api/products/products.json');
  }
}
````

En el componente, nos suscribimos al observable que nos devuelve el servicio, y este observable, puede acabar correctamente o no, y actuar en consecuencia.

`product-list-component.ts`
````typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
...


export class ProductListComponent implements OnInit, OnDestroy {
    subscription: any;

    ngOnInit() {
        this.subscription = this._productService.getProducts().subscribe((
        products => {
            this.products = products;
            this.filteredProducts = this.products;
        }), (error) => {
            console.log('error: ', error);
        });
    }

    // Nos desuscribimos del observable
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
````

Servicio con control de errores del observable:

`product.service.ts`
````typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Control de los errores y debug de los observables
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  // Declaración de una constante de clase
  static readonly IMAGETEMP: string = '';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    // Nos devuelve un orbservable que tenemos que castear para que tengamos los datos como necesitamos
    return this._http.get<IProduct[]>('./api/products/products.json').
      do(data => console.log('data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message)
  }
}
````

### Promesas

* http://www.formandome.es/javascript/promises-y-deferreds-en-jquery/

Las promesas actúan con un evento específico y cuanto termina la devolución de datos (o error) termina.

en servicio `product.service.ts`:
````typescript
// Obtener un sólo registro pasando el id como parámetro con Promises
  getProduct(id: number): Promise<IProduct> {
    return new Promise( (resolve, reject) => {
      /* resolve({name: 'Procuto 10'}); */
      /* reject('No se ha encontrado el producto'); */
      this.getProducts().subscribe( 
        (data) => {
          let p = data.find((item) => item.id === id);
          if (p !== null) { // si se ha encontrado...
            resolve(p);
          }else { // NO ha dado error, pero no ha encontrado ningún registro
            resolve(null);
          }
        }, (error) => {
          reject('Ha habido un erro en la obtención de productos');
        }
      );
    });
  }
````

Luego hay que consumirlo en el método OnInit() del componente:

`product.detail.component.ts`
````typescript
ngOnInit() {
    // Obtenemos un sólo producto con el id pasado como parámetro (Promises).
    this._productService.getProduct(id)
      .then(
        (data) => { // Nos devuelve el dato
          if (data !== null) {
            this.product = data;
          }
        }
      ).catch( // Ha habido un error
        (error) => {
          console.log('error: ', error);
        }
      );
  }
````

### Enrutamiento

Tenemos que tener la etiqueta <base href="/">en el body del index.html.

Se puede configurar en el fichero principal del módulo `app.module.ts`:
````typescript
import { Routes, RouterModule } from '@angular/router';
...
@NgModule({
  imports: [
      BrowserModule,
      ...,
      RouterModule.forRoot([
        { path: 'products', component: ProductListComponent },
        { path: 'products/:id', component: ProductDetailComponent },
        { path: '', redirectTo: 'products', pathMatch: 'full' },
        { path: '**', redirectTo: 'products', pathMatch: 'full' }
      ])
    ],
  ...
})
````
También se puede hacer en otro fichero, que suele hacerse así

Creamos el fichero app.routing.ts:

````typescript
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { EmpleadoComponent } from './empleado/empleado.component';
import { FrutaComponent } from './fruta/fruta.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'empleado', component: EmpleadoComponent},
    {path: 'fruta', component: FrutaComponent},
    {path: 'home', component: HomeComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'contacto/:page', component: ContactoComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
````

Y en app.module.ts

````typescript
...
import { routing, appRoutingProviders } from './app.routing';
...
@NgModule({
    ...
    imports: [
    ...
    routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
````

En la vista tendremos que usar la directiva <router-outlet></router-outlet> que carga dentro de esta etiqueta el componente correspondiente a la ruta actual que estoy eligiendo. Con esta directiva podemos crear un menu de navegación.

````html
<nav>
    <a [routerLink]="[ '/home' ]" routerLinkActive="activado"> Home </a> - 
    <a [routerLink]="[ '/fruta' ]" routerLinkActive="activado"> Fruta </a> - 
    <a [routerLink]="[ '/empleado' ]" routerLinkActive="activado"> Empleado </a> - 
    <a [routerLink]="[ '/contacto' ]" routerLinkActive="activado"> Contacto </a>
</nav>

<hr/>
<router-outlet></router-outlet>
````

````css
.activado { font-weight: bold; background: yellow; }
````

Con el atributo routerLiknActive le decimos la clase o clases de css que queremos que asigne cuando estamos en la opción del menú activo, pasandole un array de strings de nombres de clases.

#### Navegación desde código

````typescript
this._router.navigate(['/products']);
````

### Modularización de la aplicación

Para poder separar los componentes "externos" de los de la misma aplicación crearemos otro módulo

Tenemos que importar `CommonModule` cuando el módulo no es el principal.

`./app/shared/shared.module.ts`
````typescript
import { NgModule } from '@angular/core';
// Módulo que hay que cargar para este segundo módulo
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
````

Luego en la configuración del módulo principal `app.module.ts`

````typescript

````

Para poder usar los componentes de un módulo hay que exportarlos en el decorador @NgModule con la propiedad `exports`. Puede que algunos módulos no se usen en el módulo `sharedModule` y al no necesitarlo, no lo pondremos en `imports`, pero puede que algún módulo que lo use si que lo necesite, y por eso lo pondremos en `exports`.

### Entradas de datos

### Formuarios

Usan etiquetas de binding como ngForm, ngModel, ngModelGroup

En el template:



#### Formuarios reactivos

Se usan las **directivas** `formGroup`, `formControl`, `formControlName`, `formGroupName` y `formArrayName`.

Se basa en la reacción de cada uno de los datos

Primero hay que importar `ReactiveFormModule` en el `AppModule.ts`. Luego en el componente, ya podemos importar lo que vamos a usar, `FormGroup`, `FormControl`.

````typescript
<input class="form-control" 
                                id="productNameId" 
                                type="text" 
                                placeholder="Name (required)" 
                                formControlName="productName"
                                 />

<form class="form-horizontal"
  novalidate
  (ngSubmit)="saveProduct()"
  [formGroup]="productForm"
    >
````

Asignación de valores a campos de formularios:

Podemos usar los observables para "visualizar" los estados de un campo o varios campos de un formulario.

#### ViewChildren / ViewChild

Forma de tener en código algunos elementos que están en la template.
    Crea una coleccion de elementos de tipo FormControlName para poder acceder directamente
    con ese elemento en el DOM y los pondrá en un array llamado 'formInputElements' 
    de tipo genérico 'ElementRef'.
    Sólo los elementos que hayamos puesto con el atributo 'FormControlName'
````typescript    
@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
@ViewChild(StarRating) star: StarRating;
````

#### FormBuilder con validadores

Primero lo importamos y luego lo inyectamos
````typescript
this.fb.group({
  productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  productCode: ['',Validators.required],
  starRating: [''],
  tags: this.fb.array([]),
  description: ''
});
````

#### Carga de los datos en un formulario

Para setear parte de los campos de un formulario:
````typescript
this.productForm.patchValue({ 
  productName: this.product.productName,
  productCode: this.product.productCode,
  starRating: this.product.starRating,
  description: this.product.description,
});
````

Para setear todos los camos de un formulario se usa el método **`setValue`**.

Para setear un campo que es un array:

````typescript
this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
````

#### Suscripción para suscribir a las modificaciones de los campos del formulario

````typescript
// Método del ciclo de vida del Angular que se ejecuta cuando se han cargado todas las vistas del componente
ngAfterViewInit(): void {
  //TODO
  // Control de eventos 'pérdida de foco'
  // Vamos a suscribirnos a los cambios de los elementos del formulario que transformaremos con 'map'
  let controlBlurs: Observable<FormControl>[] = this.formInputElements.map(
    (formControl: ElementRef) => {
        // Nos vamos a suscribir a cada elemento que pierda el foco y lo ponemos en un array llamado controlBlurs
        return Observable.fromEvent(formControl.nativeElement, 'blur');
    }
  );

  // Mezclamos el array de observables de pérdida de foco con los cambios de cualquier dato de los inputs
  let array: Observable<FormControl>[] = [this.productForm.valueChanges, ...controlBlurs];

  // Mezclamos los 2 observables de tiempo que ya están juntados en el array, porque tienen2 tipos de eventos diferentes
  // Esperamos 800 milisegundos entre evento y evento
  Observable.merge(array).debounceTime(800).subscribe(
    value => {
        this.displayMessage = this.genericValidator.processMessages(this.productForm);
    }
  );
}
````

### Servicios GUARD

Servicios que controlan la salida y entrada de un componente en el sistema de routing. Por ejemplo, controla que salimos de un formulario sin guardar los datos, para que saque un diálogo de aviso al usuario. Son protección de la navegación, como protección de acceso a partes de la aplicación donde no tengo permiso si no está autenticado.

Los **Guard** se ejecutan antes del routing para poder protegerlo.

````typescript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, CanDeactivate } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {
    constructor(
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot): boolean  {
        /* 
            http://localhost:4200/products/1
            route.ur[0] = products
            route.ur[1] = 1
         */
        // el + castea a number
        const id = +route.url[1].path;

        if (isNaN(id) || id < 1) {
            console.log('Id inválido');
            // Vuelvo al listado
            this.router.navigate(['\products']);
            // Si no se cumple el criterio de validación se devuelve false y se interrumpe la navegación
            return false;
        }
        // Se cumple el criterio de la navegación
        return true;
    }
}

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    canDeactivate(component: ProductEditComponent): boolean  {
        /* 
        avisar al usuario al salir del formulario de edición 
        habiendo hecho cambios sin guardar
        */
        // Comprobamos si se ha modificado el formulario
        if (component.productForm.dirty) {
            const productName = component.productForm.get('productName').value;
            return confirm(`¿Está seguro de cancelar sin guardar los datos del producto ${productName}?`);
        }
        return true;
    }
}
````

Tenemos que importarlo en el módulo que corresponda:
````typescript
// Servicios Guard
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';

@NgModule({
  imports: [
    ...
    RouterModule.forChild([
      ...,
      {
        path: 'product/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      { 
        path: 'productEdit/:id',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent 
      },
    providers: [
      ...,
      ProductDetailGuard,
      ProductEditComponent
    ]
````

Puede devolver un boolean, un Observable de un boolean o un Promise de un boolean. 

Si no se cumple el criterio se devuelve false y sino true.

### Debug

Usando la palabra **`debugger;`** en el sitio donde queramos parar la ejecución y hacer debug a partir de ese punto.

### Patrón redux / ngrx

**Enlaces**
* https://carlosazaustre.es/como-funciona-redux-conceptos-basicos/

Arquitectura que viene de **React.js**.

REDUX: Patrón que nos permite poder 'escuchar' cambios en el modelo de datos (**Observables**). Está introducido en Angular por medio de la librería **ngrx**.

Funcionamiento: Desacoplamos la capa de presentación de todos los elementos de la aplicación. Emitimos acciones como pulsar un botón, pasa por una función **Reducer** mira lo que hay que aplicar sobre el modelo y lo modifica, luego lo mueve a un almacén que es escuchado por la interfaz de usuario y hace los cambios que crea necesario.

Sólo hay un **Store** en toda la aplicación y es inmutable, es decir, cada vez que lo cambiamos lo **hacemos en una copa de el por medio de acciones**. 

Una acción es simplemente un objeto JavaScript que incluye al menos un atributo type que indica el tipo de acción que estamos emitiendo y en caso de que haya datos asociados al cambio o modificación, un atributo payload con esos datos:

````json
{
   type: 'LOAD_PRODUCTS',
   products: products
}
````

Estas acciones suelen devolverse a través de un Action Creator que sería de este tipo:

````json
function loadProducts(products) {
  return {
    type: 'LOAD_PRODUCTS',
    products
  }
}
````

Toda la información reside en un único objeto. Esta información está completamente separada de la Interfaz de Usuario. Ese objeto representa el estado de la app. Podemos acceder a cualquier estado que haya tenido el objeto. Este objeto es Inmutable. Cuando hay un cambio en el estado de la aplicación son cosumidos de manera asincrona por medio de observables. Los cambios de estado solo podemos provocarlos por medio de la UI Todaa caccion tiene como minimo una propiedad 'type'. Este **cambio de estado** es gestionado por las funciones '**REDUCER**' que gestionan los types de las acciones.

Necesitamos un setup, es decir, configuración de redux
````bash
ng new redux --routing
cd redux
npm install @ngrx/core @ngrx/store --save
npm install @ngrx/store-devtools --save
````

**Debug para Redux** con **Redux DevTools** para google Chrome.

#### Uso básico de Redux

Aplicación que cambia de estado una variable `message` con un texto:

`app.module.ts`
````typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { saludoReducer } from './saludo.reducer';

// Número de estados que puede guardar la herramienta de debug
// StoreDevtoolsModule.instrument({maxAge: 10})
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      message: saludoReducer
    }),
    StoreDevtoolsModule.instrument({maxAge: 10})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
````

`app.component.ts`
````typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

// Interface que representa el estado de la aplicación
interface AppState {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  message: Observable<string>;

  constructor(
    // Gestiona el modelo de datos
    private store: Store<AppState>
  ) {
    // Escuchamos el cambio de estado
    // Select vincula el cambio en el almacén (store) con la variable message
    this.message = this.store.select('message');
  }

  saludarCastellano() {
    // necesito una variable de tipo store
    // Generamos los eventos
    this.store.dispatch({type: 'SPANISH'});
  }

  saludarIngles() {
    this.store.dispatch({type: 'ENGLISH'});
  }
}
````

`saludo.reducer.ts`
````typescript
// Función que recibe acciónes
import { Action } from '@ngrx/store';

export function saludoReducer(state: string = 'Hola', action: Action) {
    /*
     La variable 'message' es nuestro modelo
     que se modifican con las funciones saludarCastellano() y saludarInges()
    */

    // Lanzamiento de las acciones que cambian el estado
    switch (action.type) {
        case 'SPANISH':
            return state = 'Hola Redux !!';
        case 'ENGLISH':
            return state = 'Hello Redux !!';
        default:
            return state;
    }
}
````

`app.component.html`
````html
<!-- Gestiona la variable del observable de forma asincrona como trabajan los observables -->
<h2>{{message | async}}</h2>
<button (click)="saludarCastellano()">Saludar en castellano</button>
<button (click)="saludarIngles()">Saludar en inglés</button>
````

### Testing en Angular

Cuanto más desacoplada esté la aplicación, más fácil es testearla.

* **Unit testing**: Comprobar cada uno de los elementos que funcionan. 
  * Isolated: Sólo compruebas implementación (lógica).
  * Integrated: 
* **End-to-end testing**: Probar casos de uso. Test funcional.

Herramientas para testing en Angular:
* **Jasmine**: Para escribir test unitarios.
* **Karma**: Motor para ejecutar test.
* **Protractor**: Para test funcionales (End-to-end) en casos de uso.

````bash
npm install jasmine-core jasmine --save-dev
npm install karma karma-cli --save-dev
npm install karma-jasmine karma-chrome-launcher
````

Pasa una vez todos los test
````bash
npm run test: one
````

Hace un watch y se queda a la escucha de los test
````bash
npm run test
````

Para probar la parte lógica de una aplicación:

`app.component.spec.ts`
````bash
import { AppComponent } from './app.component';

describe('AppComponent test', () => {
  let component: AppComponent;

  beforeEach( () => {
    component = new AppComponent();
  });

  it('name esta ninicializado con el valor Angular', () => {
    // Espero que la variable name del componente sea igual a
    expect(component.name).toBe('Angular');
  });

  it('name el valor Angular X', () => {
    // Si cambiamos el valor de una variable name concuerda con lo que hemos cambiado
    component.name = 'Angular X';
    expect(component.name).toBe('Angular X');
  })

});
````

#### TDD: Test Driven Developer

Se hacen los test y luego se va haciendo la programación para ir "arreglando" los test que fallan.


#### Implementación de test unitario de un componente

Jasmine nos permite unos métodos. `describe()` agrupa los test unitarios. `describe()` se compone de `it()`. Dentro de `it()`.

Los test unitarios no tienen que depender de ningún servicio ni de nada. Tienen que ser **Isolated**, es decir, no deben ir a buscar ningún deato de los servicios, por lo que hay que hacer un **mock** de los datos.

`book-list.component.ts`
````typescript
...
export class BooksListComponent implements OnInit {
  booksList: Book[] = [];

  constructor(private storeService: BookStoreService) {
  }

  ngOnInit() {
    this.getBooksList();
  }

  getBooksList() {
    this.storeService.getBooks()
      .subscribe(books => this.booksList = books);
  }
}
````

Y ahora hacemos el test del componente

`books-list.component.spec.ts`
````typescript
import { BooksListComponent } from 'app/books/books-list/books-list.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Lógica del BookListComponent', () => {
    // Declaración del componente
    let bookListComponent: BooksListComponent;
    let mockBookStoreService;

    beforeEach( () => {
        // Creo el mock para poder probar que funciona todo sin usar el servicio
        mockBookStoreService = jasmine.createSpyObj('mockBookStoreService', ['getBooks']);
        // Inyectamos el mock en el constructor del comonente 
        // que sustituye al servicio que tiene en realidad inyectado
        bookListComponent = new BooksListComponent(mockBookStoreService);
    })

    it('Lista de libros inicialmente vacía', () => {
        const numBooks = bookListComponent.booksList.length;
        expect(numBooks).toBe(0);
        // Que no sea 0
        // expect(numBooks).not.toBe(0);
    });

    describe('ngOnInit', () => {
        it('Acceso a booklist', () => {
            const books = [{}, {}]; // Le decimos que haya 2 elementos para el mock
            // Cuando alguien invoque al mockBookStoreService devolverá un Observable de books
            mockBookStoreService.getBooks.and.returnValue(Observable.of(books));
            // Forzamos la ejecución del ngOnInit() para que cargue los 2 elementos que recupera del mock
            bookListComponent.ngOnInit();
            // Comprobamos si la longitud del array es de 2 elementos
            expect(bookListComponent.booksList.length).toBe(2);
        });
    });

})
````

#### Implementación de test unitario de un servicio
`book-store.service.ts`
````typescript
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Book } from './book';

@Injectable()
export class BookStoreService {

  baseUrl = 'http://58e15045f7d7f41200261f77.mockapi.io/api/v1/books/';
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url)
      .map(response => response.json() as Book);
  }

  getBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}`;
    return this.http.get(url)
      .map(response => response.json() as Book[]);
  }

  addBook(book: Book) {
    const url = `${this.baseUrl}`;
    const body = JSON.stringify(book);
    return this.http.post(url, body, {headers: this.headers})
      .map(response => response.json());
  }

  deleteBook(id: number) {
    const url = `${this.baseUrl}${id}`;
    return this.http.delete(url, {headers: this.headers});
  }
}
````

`book-store-service.spec.ts`
````typescript
import { BookStoreService } from './book-store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import { Book } from './book';

describe('BookStoreService', () => {
    let bookStoreService: BookStoreService;
    let mockHttp;

    // Se ejecuta antes de cada uno de los it()
    // Le inyectamos el mock para que lo use en vez del http client
    beforeEach( () => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post', 'delete']);
        bookStoreService = new BookStoreService(mockHttp);
    });

    describe('deleteBook', () => {

      // Comprobaremos que el método delete() devuelve un observable del libro borrado
      it('se debería borrar un libro', () => {
        const book: Book = {
          id: 12,
          isbn: 895565,
          title: 'libro 1',
          authors: 'xxxx',
          published: 'fecha',
          description: 'libro 1 desc',
          coverImage: 'imagen portada'
        }
        const id = 12;
        mockHttp.delete.and.returnValue(Observable.of(book));
        const response = bookStoreService.deleteBook(12);
        response.subscribe( value => {
          expect(value).toBe(book);
        });
      })

      // Comprobación de la llegada de un párametro en un método
      it('Invocación del http es correcta y además el parámetro url tiene el valor correcto', () => {
        const id = 12;
        const url = `http://58e15045f7d7f41200261f77.mockapi.io/api/v1/books/${id}`;
        // Comprobamos a true xq no nos interesa la devolución de la función
        mockHttp.delete.and.returnValue(Observable.of(true));
        const response = bookStoreService.deleteBook(id);
        // jasmine.any(Object) es un objeto cualquiera
        expect(mockHttp.delete).toHaveBeenCalledWith(url, jasmine.any(Object));
      })
    })
});
````

### Interceptores

* https://www.adictosaltrabajo.com/tutoriales/interceptores-en-angular-4-3/
* Curso de Angular con Redux

### Despliegue de una aplicación (Deploy)

* https://angular.io/guide/deployment

Compilación en un entorno de desarrollo. En el mete los ficheros .map para el mapeo con los ficheros ts.
````bash
ng build
````

Versión de producción
````bash
ng build --prod
````

#### Lazy loading

Hasta que no se use una funcionalidad, no se cargará el módulo que se vaya a usar. Se usa en el sistema de enrutado.

````typescript
{ path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
````

## angular-cli

### Generación

* Creación de un nuevo proyecto: `ng new my-app`
* Generación de un componente en una carpeta: `ng generate component components/second-component`
* Generación de un componente sin carpeta y diciendole donde: `ng generate component components/second-component --flat --spec false` (no creamos el fichero de testing *.spec.ts).
* Crear un Custom Pipe: `ng generate pipe shared/convert-to-spaces`


## Referencias oficiales y enlaces

Profesor: **`ricardo.jaume@pue.es`**

* http://veyon.io/ --> Monitorización de ordenadores de aulas

* Documentación oficial de Angular en https://angular.io/
* Documentación oficial de Typescript en http://www.typescriptlang.org/docs/home.html
* [Angular-cli](https://cli.angular.io/)

### Librerías

* Librerías para gráficos
  * https://d3js.org/
  * http://visjs.org/

* IDE Intelij (il)
http://idea.iteblog.com/key.php

Nuestro amigo el chino: http://blog.lanyus.com/

* Angular 4: Pedro J. Jiménez Castellar

* Gogs: Servidor Git