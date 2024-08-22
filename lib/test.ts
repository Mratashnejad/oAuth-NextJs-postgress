import { auth } from '@/lib/auth/authConfig';
import { pool } from '@/lib/postgres';
const name = async()=>{
    const session = auth();

    await pool.query('insert into name values ali')
}