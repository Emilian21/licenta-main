import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";

import FormInput from "../components/FormInput";
import DropZone from "../components/Dropzone";
import supabase from "../supabase";

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    lastName: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    const isLoggedIn = account?.aud === "authenticated";

    if (!isLoggedIn) {
      navigate("/autentificare");
    }

    console.log(account);
    setUser({
      firstName: account?.user_metadata?.first_name ?? "",
      lastName: account?.user_metadata?.last_name ?? "",
      email: account?.email ?? "",
      profilePicture: account?.user_metadata?.profile_picture ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const updateForm = (text, key) => {
    // @ts-ignore
    setUser({ ...user, [key]: text });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (files.length > 0) {
        const { data } = await supabase.storage
          .from("profile_pictures")
          .upload(files[0].name, files[0]);

        if (data) {
          setFiles([]);

          const { data: profile_url } = await supabase.storage
            .from("profile_pictures")
            .getPublicUrl(data.path);

          console.log(profile_url);
          await supabase.auth.updateUser({
            data: {
              profile_picture: profile_url.publicUrl,
            },
          });
        }
      }

      const account = JSON.parse(localStorage.getItem("account"));
      if (
        user.firstName !== "" &&
        user.lastName !== "" &&
        user.email !== "" &&
        (user.email !== account?.user_metadata?.first_name ||
          user.lastName !== account?.user_metadata?.last_name ||
          user.email !== account?.email)
      ) {
        console.log(user.email);
        await supabase.auth.updateUser({
          data: {
            first_name: user.firstName,
            last_name: user.lastName,
          },
          email: user.email,
        });
      }
      // logic for uploading image
    } catch (err) {
      console.log(err);
    } finally {
      const { data: userInfo } = await supabase.auth.getUser();
      console.log(userInfo);
      localStorage.setItem("account", JSON.stringify(userInfo.user));
      setRefetch(!refetch);

      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        pt: 3,
        pb: 10,
        display: "grid",
        gridTemplateColumns: {
          xs: "100%",
          sm: "minmax(120px, 30%) 1fr",
          lg: "280px 1fr minmax(120px, 208px)",
        },
        columnGap: { xs: 2, sm: 3, md: 4 },
        rowGap: { xs: 2, sm: 2.5 },
        "& > hr": {
          gridColumn: "1/-1",
        },
      }}
    >
      <FormLabel sx={{ display: { xs: "none", sm: "block" }, color: "#fff" }}>Name</FormLabel>
      <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
        <FormInput
          value={user?.firstName}
          label="First Name"
          type="text"
          onChange={(e) => updateForm(e.target.value, "firstName")}
        />
        <FormInput
          label="Last Name"
          value={user?.lastName}
          onChange={(e) => updateForm(e.target.value, "lastName")}
          type="text"
        />
      </Box>

      <Divider role="presentation" />

      <FormControl sx={{ display: { sm: "contents" } }}>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          label="Email"
          value={user?.email}
          onChange={(e) => updateForm(e.target.value, "email")}
        />
      </FormControl>

      <Divider role="presentation" />

      <Box>
        <FormLabel>Your photo</FormLabel>
        <FormHelperText>This will be displayed on your profile.</FormHelperText>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2.5,
        }}
      >
        <Avatar size="lg" src={user?.profilePicture} sx={{ "--Avatar-size": "64px" }} />
        <DropZone files={files} setFiles={setFiles} />
      </Box>

      <Divider role="presentation" />

      <Box
        sx={{
          gridColumn: "1/-1",
          justifySelf: "flex-end",
          display: "flex",
          gap: 1,
        }}
      >
        <Button variant="outlined" color="neutral" size="sm">
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit} loading={loading}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
