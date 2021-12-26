package br.com.ivanfsilva.bookstore.service;

import br.com.ivanfsilva.bookstore.domain.Categoria;
import br.com.ivanfsilva.bookstore.domain.Livro;
import br.com.ivanfsilva.bookstore.repositories.LivroRepository;
import br.com.ivanfsilva.bookstore.service.exceptions.ObjectNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    LivroRepository repository;

    @Autowired
    CategoriaService categoriaService;

    public Livro findById(Integer id) {
        Optional<Livro> obj = repository.findById(id);

        return obj.orElseThrow( () -> new ObjectNotFoundExceptions(
                "Objeto não encontrado! id: " + id + ", Tipo: " + Livro.class.getName()));
    }

    public List<Livro> findAll(Integer idCat) {
        categoriaService.findById(idCat);

        return repository.findAllByCategoria(idCat);
    }

    public Livro update(Integer id, Livro obj) {
        Livro newObj = findById(id);
        updateData(newObj, obj);

        return repository.save(newObj);
    }

    private void updateData(Livro newObj, Livro obj) {
        newObj.setTitulo(obj.getTitulo());
        newObj.setNomeAutor(obj.getNomeAutor());
        newObj.setTexto(obj.getTexto());
    }

    public Livro create(Integer idCat, Livro obj) {
        obj.setId(null);
        Categoria cat = categoriaService.findById(idCat);
        obj.setCategoria(cat);

        return repository.save(obj);
    }

    public void delete(Integer id) {
        Livro obj = findById(id);
        repository.delete(obj);
    }
}
