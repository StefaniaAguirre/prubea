export interface AddUsuario
{
    nombre:string;
    edad: number;
    correo:string;
    contrasena:string;
    telefono: string;
    direccion:string;
}

export interface servicioCliente {
    nombreTarea:string;
    descripcion:string;
    precioServicio:number;
    pagoRealizado:boolean;
    tareaTerminada:boolean;
    esAceptada:boolean;
}

export interface Customer{
    nombre: string;
    correo:string;
    contrasena: string;
    edad: number;
    telefono: string;
    direccion:string;
    idCliente:number;
}

export interface Rol 
{
    value: string;
    viewValue: string;
}

export interface AddMaker
{
    nombre: string;
    correo:string;
    contrasena: string;
    edad: number;
    telefono: string;
    direccion:string;
    idHacedor:number;
    // habilidades:AddHabilidadHacedor[];
}

export interface MakerProfile
{
    customer:AddUsuario;
    habilidades:AddHabilidadHacedor[];
}

export interface AddHabilidadHacedor
{
    idHabilidadHacedor:number;
    idTarea:number;
    idHacedor:number;
    precioHabilidad:number;
    radio:string;
}
export interface crearHabilidadHacedor
{
    idHabilidadHacedor:number;
    idTarea:number;
    idHacedor:number;
    precioHabilidad:number;
    radio:string;
}

export interface HabilidadHacedor{
    idTarea:addTarea;
    idHacedor:AddMaker;
    precioHabilidad:number;
    radio:string;
}

export interface servicioSolicitado{
    item: number, 
    descripcion: string, 
    pagoRealizado: boolean, 
    tareaTerminada: boolean, 
    idCliente: Customer, 
    idTarea: addTarea, 
    precioServicio: number;
}

export interface verificarServicio{
    precioHabilidad:number;
    idHacedor:number;
}

export interface detallesHacedor{
    nombre: string;
    edad: number;
    nombreTarea:string,
    definicion:string;
    precio:number;
}

export interface Administrador
{
    nombre: string;
    correo:string;
    contrasena: string;
}

export interface addOferta
{
    notificacion:string;
    fecha:Date;
    tiempoVida:number;
    esAceptada:boolean;
    precioBase: number;
}
export interface Oferta
{
    idOferta:number;
    notificacion:string;
    fecha:Date;
    tiempoVida:number;
    esAceptada:boolean;
    precioBase: number;
}


export interface addServicio
{
    idServicio: number;
    item:number;
    descripcion:string;
    pagoRealizado:boolean;
    tareaTerminada:boolean;
    idCliente:number;
    idTarea:number;
    precioServicio: number;
}

export interface servicioOfertado
{
    servicio:addServicio;
    idOferta:number;
}

export interface addSolicitudTarea
{
    idSolicitudTarea:number;
    nombre:string;
    descripcion:string;
    estado:boolean;
    notificacion:string;
    idCliente: number;
    idHacedor: number;
    idAdministrador: number;
}

export interface addTarea{
    idTarea:number;
    nombre:string;
    definicion:string;
}

export interface datosHabilidad{
    precio:string;
    radio:string;
}