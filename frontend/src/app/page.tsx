import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <main className="w-full max-w-5xl rounded-2xl shadow-xl bg-white p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
            Teamflow — Projects that actually flow.
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Simple boards, team management, and task assignments — built for
            fast collaboration. Invite teammates, track progress, and ship
            reliably.
          </p>

          <div className="flex gap-4">
            <Link
              href="/register"
              className="rounded-full bg-indigo-600 text-white px-6 py-3 shadow hover:bg-indigo-700"
            >
              Get started — it is free
            </Link>
            <Link
              href="/teams"
              className="rounded-full border border-indigo-100 px-6 py-3 text-indigo-700"
            >
              Explore teams
            </Link>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="text-sm text-gray-500">Trusted by:</div>
            <div className="flex items-center gap-4">
              <div className="text-sm bg-gray-100 px-3 py-1 rounded">Acme</div>
              <div className="text-sm bg-gray-100 px-3 py-1 rounded">Orbit</div>
              <div className="text-sm bg-gray-100 px-3 py-1 rounded">
                Lighthouse
              </div>
            </div>
          </div>
        </section>

        <section className="hidden md:flex items-center justify-center">
          <div className="w-full h-80 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold">Sprint board</div>
              <div className="text-xs text-gray-400">Updated 2m ago</div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-white rounded p-3 shadow-sm">
                <div className="text-sm font-medium">To do</div>
                <div className="mt-3 space-y-2">
                  <div className="text-sm">Design landing page</div>
                  <div className="text-sm">Add auth tokens</div>
                </div>
              </div>
              <div className="flex-1 bg-white rounded p-3 shadow-sm">
                <div className="text-sm font-medium">In progress</div>
                <div className="mt-3 space-y-2">
                  <div className="text-sm">Build API</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 mt-4">
              Manage tasks, teams, and assignments in one place.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
