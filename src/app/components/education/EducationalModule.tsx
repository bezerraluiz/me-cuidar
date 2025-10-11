import { Clock, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export function EducationalModule() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const articles = [
    {
      id: 1,
      category: "mama",
      title: "Por que fazer mamografia aos 40?",
      summary: "Entenda a importância da mamografia para detectar precocemente o câncer de mama e como ela salva vidas.",
      readTime: "3 min",
      image: "medical screening",
      content: "A mamografia é o exame mais eficaz para detectar o câncer de mama em estágio inicial, quando as chances de cura são maiores. Mulheres a partir dos 40 anos devem fazer o exame anualmente, pois a incidência de câncer de mama aumenta com a idade. O exame é rápido, seguro e pode identificar tumores muito pequenos, antes mesmo que possam ser sentidos ao toque.",
    },
    {
      id: 2,
      category: "intestino",
      title: "Colonoscopia: quando começar?",
      summary: "Saiba por que a colonoscopia é fundamental a partir dos 50 anos e como ela previne o câncer de intestino.",
      readTime: "4 min",
      image: "medical consultation",
      content: "A colonoscopia é o principal exame para prevenir e detectar o câncer colorretal. Recomenda-se iniciar aos 50 anos para pessoas sem histórico familiar, ou mais cedo se houver casos na família. O exame permite identificar e remover pólipos (pequenos crescimentos) antes que se tornem cancerosos. A colonoscopia é feita sob sedação, é indolor e pode salvar sua vida.",
    },
    {
      id: 3,
      category: "mama",
      title: "Autoexame das mamas: como fazer",
      summary: "Aprenda o passo a passo do autoexame e saiba quando procurar um médico.",
      readTime: "2 min",
      image: "woman healthcare",
      content: "O autoexame das mamas deve ser feito mensalmente, uma semana após a menstruação. Em pé, diante do espelho, observe tamanho, forma e cor das mamas. Levante os braços e observe novamente. Deitada, apalpe cada mama com a mão oposta, fazendo movimentos circulares. Procure nódulos, caroços, secreções ou alterações na pele. Qualquer mudança deve ser avaliada por um médico.",
    },
    {
      id: 4,
      category: "próstata",
      title: "Câncer de próstata: prevenção e diagnóstico",
      summary: "Homens acima de 50 anos precisam fazer exames preventivos. Entenda a importância.",
      readTime: "3 min",
      image: "male doctor",
      content: "O câncer de próstata é o segundo mais comum entre homens. A partir dos 50 anos (ou 45, se houver histórico familiar), é recomendado fazer anualmente o PSA (exame de sangue) e o toque retal. Muitos homens têm receio, mas os exames são rápidos e fundamentais para detectar a doença precocemente. Quando diagnosticado cedo, o câncer de próstata tem mais de 90% de chance de cura.",
    },
    {
      id: 5,
      category: "pele",
      title: "Como identificar sinais de câncer de pele",
      summary: "Aprenda a regra ABCDE para examinar pintas e manchas na pele.",
      readTime: "2 min",
      image: "skin care",
      content: "O câncer de pele é o mais comum no Brasil, mas tem altas taxas de cura quando detectado cedo. Use a regra ABCDE: A (Assimetria), B (Bordas irregulares), C (Cor variada), D (Diâmetro maior que 6mm), E (Evolução/mudança). Examine sua pele mensalmente e procure um dermatologista anualmente. Use protetor solar diariamente e evite exposição ao sol entre 10h e 16h.",
    },
    {
      id: 6,
      category: "intestino",
      title: "Sangue oculto nas fezes: o que é?",
      summary: "Conheça este exame simples que pode salvar sua vida.",
      readTime: "2 min",
      image: "laboratory test",
      content: "O exame de sangue oculto nas fezes detecta pequenas quantidades de sangue que não são visíveis a olho nu. É um teste simples, não invasivo, que pode indicar a presença de pólipos ou câncer colorretal. Pode ser feito anualmente a partir dos 50 anos como alternativa ou complemento à colonoscopia. Um resultado positivo requer uma colonoscopia para investigação mais detalhada.",
    },
  ];

  const videos = [
    {
      id: 1,
      category: "mama",
      title: "Mamografia: tire suas dúvidas",
      duration: "5:30",
      thumbnail: "medical equipment",
    },
    {
      id: 2,
      category: "intestino",
      title: "Preparação para colonoscopia",
      duration: "4:15",
      thumbnail: "hospital room",
    },
  ];

  const categories = [
    { id: "todos", label: "Todos" },
    { id: "mama", label: "Mama" },
    { id: "próstata", label: "Próstata" },
    { id: "intestino", label: "Intestino" },
    { id: "pele", label: "Pele" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filteredArticles = selectedCategory === "todos" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1>Educação em Saúde</h1>
        <p className="text-muted-foreground mt-2">
          Aprenda sobre prevenção e cuidados com sua saúde
        </p>
      </div>

      {/* Categorias */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap px-4 py-2"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="articles">Artigos</TabsTrigger>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4 mt-6">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id} 
              className="cursor-pointer transition-colors hover:bg-accent"
              onClick={() => setSelectedArticle(article)}
            >
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop`}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="mb-1 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4 mt-6">
          {videos.map((video) => (
            <Card key={video.id} className="cursor-pointer transition-colors hover:bg-accent">
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=150&fit=crop`}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                    </div>
                    <h3 className="mb-2 line-clamp-2">{video.title}</h3>
                    <div className="text-xs text-muted-foreground">
                      Duração: {video.duration}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Dialog para mostrar artigo completo */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative h-48 overflow-hidden rounded-lg bg-muted">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop`}
                alt={selectedArticle?.title || ""}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{selectedArticle?.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedArticle?.readTime}</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {selectedArticle?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
