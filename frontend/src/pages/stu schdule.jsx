
        
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Available Classes</h1>
      {classes.length === 0 ? (
        <p className="text-center text-gray-500">No classes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-white shadow p-4 rounded">
              {cls.image?.url && (
                <img
                  src={cls.image.url}
                  alt="class"
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold">{cls.title}</h2>
              <p><strong>Module:</strong> {cls.module}</p>
              <p><strong>Duration:</strong> {cls.duration}</p>
              <p><strong>Teacher:</strong> {cls.teacher?.name}</p>
              <p><strong>Email:</strong> {cls.teacher?.email}</p>
              {cls.zoomLink && (
                <a
                  href={cls.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  🔗 Join Zoom Class
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div> 
