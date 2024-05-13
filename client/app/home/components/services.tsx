import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Services = () => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Luxurious Accommodations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Experience comfort and elegance in our spacious rooms and suites.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Gourmet Dining</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Indulge in a culinary journey with our diverse dining options.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Relaxing Spa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Rejuvenate your mind and body at our tranquil spa facilities.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Conference Facilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Host successful meetings and events in our state-of-the-art conference rooms.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Outdoor Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Enjoy a variety of outdoor activities including hiking, biking, and swimming.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Family-Friendly Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Engage in fun-filled activities suitable for the whole family, ensuring memorable moments for everyone.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Services;
