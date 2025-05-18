import { supabase } from "../database/db.js";

const { data, error } = await supabase.auth.getSession();
// console.log(data.session.access_token); 