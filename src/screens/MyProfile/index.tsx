import React from "react";

import useApp from "../../hooks/useApp";

import UserProfile from "../../components/UserProfile/index";

export default function MyProfile() {
  const { account } = useApp();

  return (
    <UserProfile user={account} />
  );
}
