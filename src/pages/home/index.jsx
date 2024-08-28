import { useEffect, useState } from "react";
import { getAggregateDocuments, getRecentDocuments } from "../../api/documents";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils/utils";
import { getMostUsedTemplates } from "../../api/templates";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserDocsAggregate } from "../../api/users";

// Register necessary components for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function HomePage() {
  const auth = useAuthContext();
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [topTemplates, setTopTemplates] = useState([]);
  const [chartData, setChartData] = useState();
  const [chartOptions, setChartOptions] = useState();

  // Recent 10 Documents
  const fetchRecentDocuments = async (userId) => {
    const recentDocumentResponse = await getRecentDocuments(userId);
    setRecentDocuments(recentDocumentResponse.data);
  };

  const fetchMostUsedTemplates = async (userId) => {
    const mostUsedTemplateResponse = await getMostUsedTemplates(userId);
    setTopTemplates(mostUsedTemplateResponse.data);
  };

  const fetchAggregateDocuments = async (userId) => {
    const aggregateDocuments = await getUserDocsAggregate(userId);

    const labels = aggregateDocuments?.data.map((item) => item.month);
    const documentCounts = aggregateDocuments?.data.map(
      (item) => item.documentCount
    );
    const templateCounts = aggregateDocuments?.data.map(
      (item) => item.templateCount
    );

    const data = {
      labels,
      datasets: [
        {
          label: "Documents",
          data: documentCounts,
          backgroundColor: "#5465FF50",
          borderColor: "#5465FF",
          borderWidth: 1,
        },
        {
          label: "Templates",
          data: templateCounts,
          backgroundColor: "#FED8B150",
          borderColor: "#FED8B1",
          borderWidth: 1,
        },
      ],
    };

    // Chart options
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Monthly Counts",
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  };

  useEffect(() => {
    fetchRecentDocuments(auth.currentUser._id);
    fetchMostUsedTemplates(auth.currentUser._id);
    fetchAggregateDocuments(auth.currentUser._id);
  }, []);
  return (
    <div className=" p-10">
      {/* <Link to={`/documents/${uuidv4()}`}>
        <BaseButton buttonText="Create Template" />
      </Link> */}

      <div className="grid grid-cols-2 gap-8">
        {/* Recent 10 Documents */}
        <div className="bg-white rounded-xl">
          {/* Section Title */}
          <div className="py-4 px-8 text-2xl font-semibold border-b">
            Recent Documents
          </div>
          {/* Section Content */}
          <div className="h-52 max-h-52 overflow-y-auto">
            {recentDocuments.map((recentDocument) => (
              <div
                key={recentDocument._id}
                className="w-full py-2 hover:bg-gray-200 px-8 cursor-pointer"
              >
                <p>{recentDocument.name}</p>
                <p className="m-0 text-xs">
                  Updated on {formatDate(recentDocument.modifiedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Top 3 Templates */}
        <div className="bg-white rounded-xl">
          {/* Section Title */}
          <div className="py-4 px-8 text-2xl font-semibold border-b">
            Most Used Templates
          </div>
          {/* Section Content */}
          <div className="overflow-y-auto">
            {topTemplates.map((topTemplate) => (
              <div
                key={topTemplate._id}
                className="w-full py-2 hover:bg-gray-200 px-8 cursor-pointer"
              >
                <p>{topTemplate.name}</p>
                <p className="m-0 text-xs">
                  Updated on {formatDate(topTemplate.modifiedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="">
          {chartData && chartOptions && (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}
