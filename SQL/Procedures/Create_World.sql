CREATE OR ALTER PROCEDURE CreateNewWorld(
    @GuildId CHAR(18), 
    @UserId CHAR(18),
    @WorldName VARCHAR(32)
) AS BEGIN

    -- Validation --
    IF (@GuildId IS NULL OR @UserId IS NULL) BEGIN
        PRINT 'CreateNewWorld: GuildId & UserId cannot be null!'
        RETURN 1
    END

    IF NOT EXISTS (SELECT * FROM [User] WHERE Id=@UserId AND GuildId=@GuildId) BEGIN
        PRINT 'CreateNewWorld: User does not exist in guild!'
        RETURN 2
    END

    IF EXISTS (SELECT * FROM World WHERE HostId=@UserId AND GuildId=@GuildId) BEGIN
        PRINT 'CreateNewWorld: User cannot have multiple active worlds in the same guild!'
        RETURN 3
    END

    -- Procedure --
    INSERT INTO World(HostId, GuildId, [Name])
    VALUES(@UserId, @GuildId, @WorldName)

END