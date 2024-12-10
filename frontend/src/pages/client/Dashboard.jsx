import { withTokenRefresh } from "@/components/withTokenRefresh";

const Dashboard = () => {
  return <div>Dashboard ni client</div>;
};

export default withTokenRefresh(Dashboard);
