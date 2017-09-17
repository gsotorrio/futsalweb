/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4001)
    Source Database Engine Edition : Microsoft SQL Server Enterprise Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [FutsalwebDB]
GO
/****** Object:  Table [dbo].[Coaches]    Script Date: 17-Sep-17 1:10:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Coaches](
	[Id] [uniqueidentifier] NOT NULL,
	[TeamId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Surname] [varchar](100) NOT NULL,
	[Birthdate] [date] NULL,
	[Role] [varchar](100) NULL,
 CONSTRAINT [PK_Coaches] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GamePlayedByPlayers]    Script Date: 17-Sep-17 1:10:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GamePlayedByPlayers](
	[GameId] [uniqueidentifier] NOT NULL,
	[PlayerId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_GamePlayedByPlayers] PRIMARY KEY CLUSTERED 
(
	[GameId] ASC,
	[PlayerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Games]    Script Date: 17-Sep-17 1:10:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Games](
	[Id] [uniqueidentifier] NOT NULL,
	[TeamId] [uniqueidentifier] NOT NULL,
	[RivalTeam] [nvarchar](100) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Location] [nvarchar](100) NOT NULL,
	[Type] [nvarchar](100) NOT NULL,
	[PlayedAtHome] [bit] NOT NULL,
 CONSTRAINT [PK_Games] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Players]    Script Date: 17-Sep-17 1:10:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Players](
	[Id] [uniqueidentifier] NOT NULL,
	[TeamId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Surname] [nvarchar](100) NOT NULL,
	[Birthdate] [date] NULL,
	[Height] [float] NULL,
	[Weight] [float] NULL,
	[StrongLeg] [varchar](50) NULL,
	[Status] [varchar](50) NULL,
	[Position] [varchar](100) NULL,
	[Number] [int] NULL,
 CONSTRAINT [PK_Players] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teams]    Script Date: 17-Sep-17 1:10:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teams](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Category] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Teams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Coaches]  WITH CHECK ADD  CONSTRAINT [FK_Coaches_Teams] FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
GO
ALTER TABLE [dbo].[Coaches] CHECK CONSTRAINT [FK_Coaches_Teams]
GO
ALTER TABLE [dbo].[GamePlayedByPlayers]  WITH CHECK ADD  CONSTRAINT [FK_GamePlayedByPlayers_Games1] FOREIGN KEY([GameId])
REFERENCES [dbo].[Games] ([Id])
GO
ALTER TABLE [dbo].[GamePlayedByPlayers] CHECK CONSTRAINT [FK_GamePlayedByPlayers_Games1]
GO
ALTER TABLE [dbo].[GamePlayedByPlayers]  WITH CHECK ADD  CONSTRAINT [FK_GamePlayedByPlayers_Players] FOREIGN KEY([PlayerId])
REFERENCES [dbo].[Players] ([Id])
GO
ALTER TABLE [dbo].[GamePlayedByPlayers] CHECK CONSTRAINT [FK_GamePlayedByPlayers_Players]
GO
ALTER TABLE [dbo].[Games]  WITH CHECK ADD  CONSTRAINT [FK_Games_Teams] FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
GO
ALTER TABLE [dbo].[Games] CHECK CONSTRAINT [FK_Games_Teams]
GO
ALTER TABLE [dbo].[Players]  WITH CHECK ADD  CONSTRAINT [FK_Players_Teams] FOREIGN KEY([TeamId])
REFERENCES [dbo].[Teams] ([Id])
GO
ALTER TABLE [dbo].[Players] CHECK CONSTRAINT [FK_Players_Teams]
GO
