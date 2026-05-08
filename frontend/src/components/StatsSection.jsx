function StatsSection() {
  const stats = [
    {
      number: "10K+",
      label: "Career Simulations Completed",
    },
    {
      number: "95%",
      label: "Students Felt More Confident",
    },
    {
      number: "50+",
      label: "Career Paths Explored",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center hover:border-purple-500 hover:-translate-y-2 transition duration-300"
          >
            <h2 className="text-5xl font-bold text-purple-400 mb-4">
              {stat.number}
            </h2>

            <p className="text-gray-400 text-lg">
              {stat.label}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default StatsSection;