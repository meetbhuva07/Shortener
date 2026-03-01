import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        // map rate‑limit status to a clearer message
        if (error.status === 429) {
            throw new Error('Too many requests, please wait a moment and try again');
        }
        throw new Error(error.message);
    }
    return data;
}

export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getSession();
    console.log(session);
    if (!session.session) return null;

    // const {data, error} = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return session.session?.user;
}

export async function signup({ name, email, password, profile_pic }) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("profile_pic")
        .upload(fileName, profile_pic);

    if (storageError) throw new Error(storageError.message);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
            },
        },
    });

    if (error) {
        if (error.status === 429) {
            throw new Error('Too many requests, please wait a moment and try again');
        }
        throw new Error(error.message);
    }

    return data;
}
