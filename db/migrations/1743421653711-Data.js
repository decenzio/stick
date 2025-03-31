module.exports = class Data1743421653711 {
    name = 'Data1743421653711'

    async up(db) {
        await db.query(`ALTER TABLE "nftaa_entity" DROP COLUMN "version"`)
        await db.query(`ALTER TABLE "nftaa_transfer" DROP COLUMN "version"`)
        await db.query(`ALTER TABLE "nftaa_proxy_execution" DROP COLUMN "version"`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "nftaa_entity" ADD "version" integer NOT NULL`)
        await db.query(`ALTER TABLE "nftaa_transfer" ADD "version" integer NOT NULL`)
        await db.query(`ALTER TABLE "nftaa_proxy_execution" ADD "version" integer NOT NULL`)
    }
}
