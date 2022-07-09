const mssql = require('mssql');

module.exports = {

    /**
     * 
     * @param {mssql.ConnectionPool} con 
     * @param {string} permissionLevel 
     * @param {string} user 
     * 
     * @returns {Promise<boolean>}
     */
    async checkPermissions(con, permissionLevel, user) {

        return new Promise((resolve, reject) => {
            if (permissionLevel == 'all') {
                resolve(true);
            }

            // Timeout after 2 minutes (should not take nearly that long to finish)
            setTimeout(() => {
                reject('Timeout');
            }, 120000);

        });
    }
}