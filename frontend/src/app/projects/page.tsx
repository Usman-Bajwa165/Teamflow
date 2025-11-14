// frontend/app/projects/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { createProject, getProject, listProjects } from '../../lib/api';
import Link from 'next/link';

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

useEffect(() => {
  (async () => {
    try {
      const res = await listProjects();
      setProjects(res);
    } catch (err) {
      // ignore or surface
    }
  })();
}, []);


  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name || name.trim().length < 2) {
      setMsg('Project name must be at least 2 characters.');
      return;
    }
    try {
      const p = await createProject(name.trim(), desc.trim());
      setProjects((s) => [...s, p]);
      setName(''); setDesc('');
    } catch (err: any) {
      const errMsg = err?.body?.message || 'Failed to create project';
      setMsg(errMsg);
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Projects</h2>

      <form onSubmit={addProject} className="mb-6 space-y-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" className="w-full px-3 py-2 border rounded" />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description (optional)" className="w-full px-3 py-2 border rounded" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create project</button>
      </form>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.description}</div>
            </div>
            <Link href={`/projects/${p.id}`} className="text-blue-600">Open board</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
