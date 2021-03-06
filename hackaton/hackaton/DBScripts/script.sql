USE [Hackaton]
GO
/****** Object:  Table [dbo].[Paradas]    Script Date: 8/27/2016 5:46:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Paradas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](max) NULL,
	[Ubicacion] [geography] NULL,
	[Id_Ruta] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Rutas]    Script Date: 8/27/2016 5:46:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rutas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Origen_Nombre] [nvarchar](max) NULL,
	[Origen] [geography] NULL,
	[Destino_Nombre] [nvarchar](max) NULL,
	[Destino] [geography] NULL,
	[FrecuenciaMin] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 8/27/2016 5:46:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Apellidos] [nvarchar](max) NULL,
	[Username] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[Telefono] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Origen] [geography] NULL,
	[Destino] [geography] NULL,
	[Foto] [nvarchar](max) NULL,
	[HoraSalida] [time](7) NULL,
	[HoraRegreso] [time](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Paradas]  WITH CHECK ADD FOREIGN KEY([Id_Ruta])
REFERENCES [dbo].[Rutas] ([Id])
GO
/****** Object:  StoredProcedure [dbo].[obtenerChoferesCercanos]    Script Date: 8/27/2016 5:46:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[obtenerChoferesCercanos]
	@latOrigen float,
	@lngOrigen float,
	@latDestino float,
	@lngDestino float,
	@top int
AS
BEGIN

SET NOCOUNT ON;

DECLARE @gOrigen geography = geography::Point(@latOrigen, @lngOrigen, 4326); 
DECLARE @gDestino geography = geography::Point(@latDestino, @lngDestino, 4326); 
 
SELECT TOP(@top) 
Nombre,
Apellidos,
Telefono,
Email,
HoraSalida,
HoraRegreso,
Origen.ToString() as Origen, 
Origen.STDistance(@gOrigen) AS DistanciaOrigen,
Destino.ToString() as Destino, 
Destino.STDistance(@gDestino) AS DistanciaDestino

FROM dbo.Usuarios
WHERE (Origen.STDistance(@gOrigen) IS NOT NULL AND Destino.STDistance(@gDestino) IS NOT NULL)
ORDER BY (Origen.STDistance(@gOrigen)+ Destino.STDistance(@gDestino)); 

END




GO
/****** Object:  StoredProcedure [dbo].[obtenerPuntosCercanos]    Script Date: 8/27/2016 5:46:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[obtenerPuntosCercanos]
	@lat float,
	@lng float,
	@top int
AS
BEGIN

SET NOCOUNT ON;

DECLARE @g geography = geography::Point(@lat, @lng, 4326); 
 
SELECT TOP(@top) 
Ubicacion.ToString() as Ubicacion, 
Ubicacion.STDistance(@g) AS Distancia,
Descripcion 
FROM dbo.Paradas
WHERE Ubicacion.STDistance(@g) IS NOT NULL  
ORDER BY Ubicacion.STDistance(@g); 

END



GO
USE [master]
GO
ALTER DATABASE [Hackaton] SET  READ_WRITE 
GO
