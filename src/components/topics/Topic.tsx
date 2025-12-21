/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect, useMemo } from "react";

import {
    ChevronDown,
    ChevronUp,
    CheckCircle,
} from "lucide-react";

interface SubTopic {
    name: string;
    leetCodeLink: string;
    youTubeLink: string;
    articleLink: string;
    level: 'EASY' | 'MEDIUM' | 'HARD';
    status: 'Done' | 'Pending';
    completed: boolean;
}

interface Topic {
    title: string;
    status: string;
    color: string;
    subTopics: SubTopic[];
}

interface TopicsData {
    [key: string]: Topic;
}

interface ExpandedSections {
    [key: string]: boolean;
}

interface ProgressData {
    easy: { completed: number; total: number; percentage: number };
    medium: { completed: number; total: number; percentage: number };
    hard: { completed: number; total: number; percentage: number };
}

export default function TopicsPage() {
    const [topicsData, setTopicsData] = useState<TopicsData>({});
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Fetch Topics from API
    useEffect(() => {
        setMounted(true);

        const fetchTopics = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/topics");
                if (!res.ok) throw new Error("Failed to fetch topics");

                const data: TopicsData = await res.json();

                setTopicsData(data);

                const initialExpanded: ExpandedSections = {};
                Object.keys(data).forEach((key, index) => {
                    initialExpanded[key] = index === 0;
                });
                setExpandedSections(initialExpanded);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleSubTopicCompletion = (topicKey: string, index: number) => {
        setTopicsData(prev => ({
            ...prev,
            [topicKey]: {
                ...prev[topicKey],
                subTopics: prev[topicKey].subTopics.map((s, i) =>
                    i === index
                        ? {
                            ...s,
                            completed: !s.completed,
                            status: !s.completed ? "Done" : "Pending",
                        }
                        : s
                ),
            },
        }));
    };

    const progress = useMemo<ProgressData>(() => {
        const all = Object.values(topicsData).flatMap(t => t.subTopics);

        const calc = (level: SubTopic['level']) => {
            const filtered = all.filter(s => s.level === level);
            const completed = filtered.filter(s => s.completed).length;
            return {
                completed,
                total: filtered.length,
                percentage: filtered.length
                    ? Math.round((completed / filtered.length) * 100)
                    : 0,
            };
        };

        return {
            easy: calc("EASY"),
            medium: calc("MEDIUM"),
            hard: calc("HARD"),
        };
    }, [topicsData]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("easy", JSON.stringify(progress.easy.percentage));
            localStorage.setItem("medium", JSON.stringify(progress.medium.percentage));
            localStorage.setItem("hard", JSON.stringify(progress.hard.percentage));
        }
    }, [progress]);

    const getLevelColor = (level: SubTopic['level']) => {
        if (level === "EASY") return "text-green-600 bg-green-100";
        if (level === "MEDIUM") return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Topics</h2>
                <p className="text-gray-600">Explore these exciting topics!</p>
            </div>
            <div className="max-w-6xl mx-auto space-y-4">
                {Object.entries(topicsData).map(([key, topic]) => (
                    < div key={key} className="bg-white rounded shadow" >

                        <div
                            className="bg-cyan-400 p-4 flex justify-between cursor-pointer"
                            onClick={() => toggleSection(key)}
                        >
                            <div className="flex items-center space-x-3">
                                <h3 className="text-black font-semibold text-lg">{topic.title}</h3>
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    {topic.status}
                                </span>
                            </div>
                            {expandedSections[key] ? <ChevronUp /> : <ChevronDown />}
                        </div>

                        {
                            expandedSections[key] && (
                                <div className="p-4 overflow-x-auto">
                                    <table className="w-full border">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="border p-2">Name</th>
                                                <th className="border p-2">LeetCode</th>
                                                <th className="border p-2">YouTube</th>
                                                <th className="border p-2">Article</th>
                                                <th className="border p-2">Level</th>
                                                <th className="border p-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topic.subTopics.map((s, i) => (
                                                <tr key={i}>
                                                    <td className="border p-2 flex gap-2">
                                                        <button onClick={() => toggleSubTopicCompletion(key, i)}>
                                                            {s.completed ? (
                                                                <CheckCircle className="text-green-500 w-4 h-4" />
                                                            ) : (
                                                                <div className="w-4 h-4 border rounded" />
                                                            )}
                                                        </button>
                                                        {s.name}
                                                    </td>
                                                    <td className="border p-2 text-center">
                                                        <a href={s.leetCodeLink} target="_blank" rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 underline">
                                                            Practise
                                                        </a>
                                                    </td>
                                                    <td className="border p-2 text-center">
                                                        <a href={s.youTubeLink} target="_blank" rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 underline">
                                                            Watch
                                                        </a>
                                                    </td>
                                                    <td className="border p-2 text-center">
                                                        <a href={s.articleLink} target="_blank" rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 underline">
                                                            Read
                                                        </a>
                                                    </td>
                                                    <td className="border p-2 text-center">
                                                        <span className={`px-2 py-1 text-xs rounded ${getLevelColor(s.level)}`}>
                                                            {s.level}
                                                        </span>
                                                    </td>
                                                    <td className="border p-2 text-center">

                                                        <span className={`${s.status === 'Done' ? 'text-green-600' : 'text-yellow-600'} font-semibold`}>
                                                            {s.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div >
    );
}
