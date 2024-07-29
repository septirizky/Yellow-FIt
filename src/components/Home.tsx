import { Label, User } from "@/app/types";

interface HomeProps {
  user: User;
  labels: { [key: string]: string[] };
  onDelete: (category: string, label: string) => void;
  onCreate: () => void;
  onEdit: (label: Label) => void;
}

const Home: React.FC<HomeProps> = ({
  user,
  labels,
  onDelete,
  onCreate,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Halo, Asroel!</h1>
        <p className="text-gray-700 mb-4">asroel.dev@gmail.com</p>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Labels</h2>
          <button
            className="bg-yellow-400 text-white py-1 px-3 rounded"
            onClick={onCreate}
          >
            + New Label
          </button>
        </div>
        <div>
          {Object.keys(labels).map((category) => (
            <div key={category} className="mb-4">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Customer Type</h3>
                {labels[category].map((label) => (
                  <div
                    key={label}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{label}</span>
                    <div>
                      <button
                        onClick={() => onEdit({ name: label, category })}
                        className="text-blue-500 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(category, label)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
