export interface AddUsuario
{
    usuario:Administrador;
    edad: number;
    telefono: string;
    direccion:string;
}

export interface Customer{
    nombre: string;
    correo:string;
    contrasena: string;
    edad: number;
    telefono: string;
    direccion:string;
    idCustomer:number;
}

export interface AddMaker
{
    nombre: string;
    correo:string;
    contrasena: string;
    edad: number;
    telefono: string;
    direccion:string;
    idMaker:number;
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

export interface HabilidadHacedor{
    idTarea:number;
    idHacedor:number;
    precioHabilidad:number;
    radio:string;
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
    idtarea:number;
    nombre:string;
    definicion:string;
}

export interface datosHabilidad{
    precio:string;
    radio:string;
}