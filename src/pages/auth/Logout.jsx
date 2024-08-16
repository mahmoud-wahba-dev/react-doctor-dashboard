
import { Typography } from "@material-tailwind/react";


function Logout() {

  return (
    <Typography
      color="inherit"
      className="font-medium capitalize cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </Typography>
  );
}

export default Logout;
