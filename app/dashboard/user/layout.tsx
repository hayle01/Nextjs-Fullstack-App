import Layout from "../_components/Layout";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>{children}</Layout>
  )
};

export default UserLayout;
