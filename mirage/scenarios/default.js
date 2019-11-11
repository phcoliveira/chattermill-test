export default function(server) {
  server.loadFixtures();

  server.createList('review', 100);
}
