"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const problems = [
	{
		id: 1,
		title: "Auto Complete Search Features",
		link: "/autocomplete",
		company: "Google, Amazon, Meta",
		level: "medium",
		status: "active",
		description: "Implement an autocomplete feature with debouncing and API integration"
	},
	{
		id: 2,
		title: "Infinite Scroll Implementation",
		link: "/infinite-scroll",
		company: "LinkedIn, Twitter, Meta",
		level: "medium",
		status: "coming",
		description: "Build infinite scroll with intersection observer and virtualization"
	},
	{
		id: 3,
		title: "Todo App with Redux",
		link: "/todo-redux",
		company: "Microsoft, Amazon",
		level: "easy",
		status: "coming",
		description: "Create a todo application with state management using Redux"
	},
	{
		id: 4,
		title: "Image Carousel",
		link: "/carousel",
		company: "Airbnb, Uber",
		level: "easy",
		status: "coming",
		description: "Build a responsive image carousel with touch support"
	},
	{
		id: 5,
		title: "Star Rating Component",
		link: "/star-rating",
		company: "Booking.com, Yelp",
		level: "easy",
		status: "coming",
		description: "Create an interactive star rating component"
	}
];

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedLevel, setSelectedLevel] = useState('all');

	const filteredProblems = problems.filter(problem => {
		const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesLevel = selectedLevel === 'all' || problem.level === selectedLevel;
		return matchesSearch && matchesLevel;
	});

	const levels = ['all', 'easy', 'medium', 'hard'];

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-4xl font-bold mb-6">Machine Round Problems</h1>
			<p className="text-gray-600 mb-8">
				Practice commonly asked machine coding round problems from top companies.
			</p>

			<div className="flex gap-4 mb-8">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
					<Input
						type="text"
						placeholder="Search problems..."
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex gap-2">
					{
					levels.map(level => (
						<button
							key={level}
							onClick={() => setSelectedLevel(level)}
							className={`px-4 py-2 rounded-lg capitalize ${selectedLevel === level
									? 'bg-blue-600 text-white'
									: 'bg-gray-100 hover:bg-gray-200'
								}`}
						>
							{level}
						</button>
					))
					}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{
				filteredProblems.map((problem) => (
					<Card key={problem.id} className="flex flex-col">
						<CardHeader>
							<div className="flex justify-between items-start">
								<h3 className="text-xl font-semibold">{problem.title}</h3>
								<Badge variant={problem.level === 'easy' ? 'default' : 'destructive'}>
									{problem.level}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 mb-2">{problem.description}</p>
							<p className="text-sm text-gray-500">Companies: {problem.company}</p>
						</CardContent>
						<CardFooter className="mt-auto">
							<Link
								href={problem.link}
								className={`w-full text-center py-2 rounded-lg ${problem.status === 'coming'
										? 'bg-gray-100 text-gray-400 cursor-not-allowed'
										: 'bg-blue-600 text-white hover:bg-blue-700'
									}`}
								onClick={(e) => problem.status === 'coming' && e.preventDefault()}
							>
								{problem.status === 'coming' ? 'Coming Soon' : 'View Problem'}
							</Link>
						</CardFooter>
					</Card>
				))
				}
			</div>
		</div>
	);
}