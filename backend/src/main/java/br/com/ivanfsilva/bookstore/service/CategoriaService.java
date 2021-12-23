package br.com.ivanfsilva.bookstore.service;

import br.com.ivanfsilva.bookstore.domain.Categoria;
import br.com.ivanfsilva.bookstore.dtos.CategoriaDTO;
import br.com.ivanfsilva.bookstore.repositories.CategoriaRepository;
import br.com.ivanfsilva.bookstore.service.exceptions.ObjectNotFoundExceptions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    CategoriaRepository categoriaRepository;

    public Categoria findById(Integer id) {
        Optional<Categoria> obj = categoriaRepository.findById(id);

        return obj.orElseThrow( () -> new ObjectNotFoundExceptions(
                "Objeto não encontrado! id: " + id + ", Tipo: " + Categoria.class.getName()));
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria create(Categoria obj) {
        obj.setId(null);

        return categoriaRepository.save(obj);
    }

    public Categoria update(Integer id, CategoriaDTO objDTO) {
        Categoria obj = findById(id);
        obj.setNome(objDTO.getNome());
        obj.setDescricao(objDTO.getDescricao());

        return categoriaRepository.save(obj);
    }

    public void delete(Integer id) {
        findById(id);
        try {
            categoriaRepository.deleteById(id);
        } catch ( DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Categoria não pode ser deletada! Possui livros associados");
        }
    }
}
