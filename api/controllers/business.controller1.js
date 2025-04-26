import { supabase } from "../database/db.js";

// Create Business (Only for Logged-in Users)
export const verify = async (req, res) => {
    try {
        // 🔹 Extract Token from Header
        const authToken = req.header("Authorization");
        if (!authToken || !authToken.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized. Missing or invalid token." });
        }
        const token = authToken.replace("Bearer ", "");

        // 🔹 Verify User Token with Supabase
        const { data: authData, error: authError } = await supabase.auth.getUser(token);

        if (authError || !authData?.user) {
            return res.status(401).json({ error: "Unauthorized. Invalid token." });
        }

        const authUserId = authData.user.id; // Supabase Auth User UUID
        console.log(authUserId)

        // 🔹 Find Corresponding User in `users` Table
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id")
            .eq("auth_uid", authUserId) // Ensure `auth_uid` exists in your `users` table
            .single();

        if (userError || !userData) {
            return res.status(400).json({ error: "User not found in database." });
        }

        const user_id = userData.id; // Correct user_id for businesses table

        // 🔹 Extract Business Data from Request Body
        const { name, description, address, city, phone, state, zip_code } = req.body;

        if (!name || !address || !city || !phone || !state || !zip_code) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // 🔹 Insert Business into `businesses` Table
        const { data: businessData, error: insertError } = await supabase
            .from("businesses")
            .insert([
                { user_id, name, description, address, city, phone, state, zip_code, is_verified: true }
            ])
            .select()
            .single(); // Ensure it returns the inserted row

        if (insertError) {
            return res.status(500).json({ error: "Error inserting business.", details: insertError });
        }

        res.status(201).json({ message: "Business created successfully!", business: businessData });

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
