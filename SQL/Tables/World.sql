CREATE TABLE [World](

    -- Columns --
    HostId CHAR(18) NOT NULL,
    GuildId CHAR(18) NOT NULL,
    WorldId INT IDENTITY(0,1) NOT NULL,
    [Name] VARCHAR(32) NOT NULL

    -- Constraints --
    CONSTRAINT PK_World PRIMARY KEY(SessionId),
    CONSTRAINT FK_World_User FOREIGN KEY(HostId) REFERENCES [User](Id),
    CONSTRAINT FK_World_Guild FOREIGN KEY(GuildId) REFERENCES [Guild](Id)


)