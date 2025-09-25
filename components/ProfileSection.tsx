export default function ProfileSection() {
  return (
    <section className="px-6 py-20 md:py-28 bg-black text-white">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr] max-w-7xl mx-auto">
        {/* Columna izquierda — título grande */}
        <div className="md:sticky md:top-24 self-start">
          <h2 className="font-extrabold text-4xl leading-none tracking-wider uppercase text-start">
            PROFILE
          </h2>
        </div>

        {/* Columna derecha — copy */}
        <div className="space-y-10 text-lg leading-8 md:text-xl md:leading-9">
          <p className="text-zinc-200">
            For the past 7+ years, I’ve been building innovative and secure
            digital platforms that combine performance, scalability, and modern
            design.
          </p>

          <p className="text-zinc-300">
            Specializing in full stack development with React.js, Next.js, and
            NestJS, I create robust applications that integrate advanced
            encryption, cloud solutions, and user-centered experiences.
          </p>

          <p className="text-zinc-300">
            Drawing from my background in business intelligence and software
            engineering, I use data analysis, microservices, and UX best
            practices to deliver platforms that are both technically solid and
            intuitive to use.
          </p>

          <p className="text-zinc-300">
            Throughout my career, I’ve developed secure digital-signature
            platforms, e-commerce systems, analytics dashboards, and mobile apps
            — always with a focus on reliability, efficiency, and innovation.
          </p>

          <p className="text-zinc-300">
            As a developer passionate about continuous learning, I’m currently
            expanding my cloud expertise with AWS, while applying technologies
            like Docker, GitFlow, and Scrum to boost team productivity and
            ensure seamless releases.
          </p>
        </div>
      </div>
    </section>
  );
}
