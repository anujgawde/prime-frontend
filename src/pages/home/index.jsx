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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
          text: `Statistics for ${new Date().getFullYear()}`,
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
    <div className="p-4 md:p-10 h-full">
      {/* <Link to={`/documents/${uuidv4()}`}>
        <BaseButton buttonText="Create Template" />
      </Link> */}

      <div className="grid lg:grid-cols-2 gap-8 h-full">
        {/* Recent 10 Documents */}
        <div className="h-full">
          <div className="bg-white h-full rounded-xl">
            {/* Section Title */}
            <div className="py-4 px-8 text-2xl font-semibold border-b">
              Recent Documents
            </div>
            {/* Section Content */}
            <div className=" overflow-y-auto">
              {recentDocuments.map((recentDocument) => (
                <div
                  onClick={() =>
                    navigate(
                      `/documents/${recentDocument.templateId}/${recentDocument._id}`
                    )
                  }
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
        </div>

        <div className="h-full flex justify-between flex-col space-y-2">
          {/* Top 3 Templates */}
          <div className="bg-white h-1/2 rounded-xl">
            {/* Section Title */}
            <div className="py-4 px-8 text-2xl font-semibold border-b">
              Most Used Templates
            </div>
            {/* Section Content */}
            <div className="overflow-y-auto h-52 max-h-52">
              {topTemplates.map((topTemplate) => (
                <div
                  onClick={() => navigate(`/templates/${topTemplate._id}`)}
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
          <div className="bg-white h-1/2 rounded-xl p-4  hidden md:block">
            {chartData && chartOptions && (
              <Bar data={chartData} options={chartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
