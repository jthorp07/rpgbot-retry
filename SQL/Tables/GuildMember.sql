CREATE TABLE GuildMember(

    -- Columns --
    GuildId VARCHAR(16) NOT NULL,
    MemberId VARCHAR(16) NOT NULL

    -- Key --
    CONSTRAINT PK_GuildMember PRIMARY KEY(GuildId, MemberId)

)