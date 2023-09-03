import React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useDropzone } from "react-dropzone";

const DropZone = ({
  files,
  setFiles,
  acceptTypes = { "image/svg+xml": [], "image/jpeg": [], "image/png": [] },
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDropAccepted: (files) => {
      setFiles(files);
    },
    accept: acceptTypes,
  });

  return (
    <Card
      variant="outlined"
      {...getRootProps({ className: "dropzone" })}
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          px: 3,
          flexGrow: 1,
        },
      ]}
    >
      <input {...getInputProps()} />
      {!files[0] ? (
        <Box
          {...getRootProps({ className: "dropzone" })}
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            },
          ]}
        >
          <Box sx={{ p: 1, bgcolor: "background.level1", borderRadius: "50%" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "background.level2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i data-feather="upload-cloud" />
            </Box>
          </Box>
          <Typography level="body2" textAlign="center">
            <Link component="button" overlay onClick={open}>
              Click to upload
            </Link>{" "}
            or drag and drop
            <br /> SVG, PNG or JPG (max. 800x400px)
          </Typography>
        </Box>
      ) : (
        <Box
          {...getRootProps({ className: "dropzone" })}
          sx={[
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            },
          ]}
        >
          <Box sx={{ p: 1, bgcolor: "background.level1", borderRadius: "50%" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "background.level2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i data-feather="file" />
            </Box>
          </Box>
          <Typography level="body2" textAlign="center">
            {files[0]?.name}
          </Typography>

          <IconButton
            onClick={() => {
              setFiles([]);
            }}
            sx={{ marginLeft: "20px" }}
            variant="plain"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default DropZone;
