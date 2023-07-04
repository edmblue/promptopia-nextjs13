const PromptCard = () => {
  return (
    <div className="w-full flex flex-col gap-4 border border-gray-300 p-3 rounded-lg">
      <div className="flex flex-between ">
        <div className="flex gap-2 items-center">
          <div className="rounded-full bg-red-400 w-10 h-10"></div>
          <div>
            <p className="font-bold">Jane Doe</p>
            <p className="text-gray-700 text-sm">janedoe.10@gmail.com</p>
          </div>
        </div>
        <div className="rounded-full bg-gray-400 w-7 h-7"></div>
      </div>
      <div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
          provident modi quasi minima perferendis. Sit possimus vel quae
          praesentium, sed illum nobis nostrum ratione, corporis, fugit repellat
          voluptatum fugiat quis?
        </p>
        <div>
          <ul className="flex gap-x-3 flex-wrap my-2">
            <li className="text-blue-500 text-sm">#etiqueta1</li>
            <li className="text-blue-500 text-sm">#etiqueta2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;