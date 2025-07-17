import postgres, { type Sql } from "postgres";

const connectionString =
  "postgresql://postgres.mbmckfzxjkixpvhfjwzr:ZAOyEY0CnWKhCsJj@aws-0-us-east-2.pooler.supabase.com:5432/postgres";

// Configuração do cliente postgres.js
// Se o seu servidor PostgreSQL não suporta SSL (comum em ambientes de desenvolvimento local),
// defina 'ssl: false'.
// Em produção, você deve ter um certificado SSL válido e configurar 'ssl' corretamente.
const sql: Sql = postgres(connectionString || "", {
  ssl: false, // <--- ALTERADO AQUI: Desabilita SSL
});

export default sql;
