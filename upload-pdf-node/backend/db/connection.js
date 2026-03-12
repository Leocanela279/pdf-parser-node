const getSupabase = async () => {
  const { createClient } = await import("@supabase/supabase-js");

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ROLE_KEY);
};

export const saveCandidate = async ({ name, email }) => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("employee")
    .insert({
      name: name,
      email: email,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
