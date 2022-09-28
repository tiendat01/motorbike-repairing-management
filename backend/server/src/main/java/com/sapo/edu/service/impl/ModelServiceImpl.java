package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Model;
import com.sapo.edu.entity.Product;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.ModelDTOMapper;
import com.sapo.edu.payload.crudrequest.ModelRequest;
import com.sapo.edu.payload.searchrequest.SearchCriteria;
import com.sapo.edu.repository.ModelRepository;
import com.sapo.edu.repository.ProductRepository;
import com.sapo.edu.repository.dao.ModelDAO;
import com.sapo.edu.service.ModelService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class ModelServiceImpl extends BaseServiceImpl<Model> implements ModelService {

    @Autowired
    private ModelRepository modelRepository;
    @Autowired
    private ModelDTOMapper dtoMapper;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelDAO modelDAO;

    protected ModelServiceImpl(ModelRepository modelRepository) {
        super(modelRepository);
    }

    @Override
    @Transactional
    public Model save(Model newEntity) {
        if (modelRepository.existsByModelNameAndBrandId(newEntity.getModelName(), newEntity.getBrand().getId())) {
            throw new DuplicateEntityException(ModelRequest.class, "modelName & brandName", newEntity.getModelName());
        }
        return super.save(newEntity);
    }

    @Override
    @Transactional
    public Model updateById(Long id, Model newEntity) {
        Model oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());

        if (modelRepository.existsByModelNameAndBrandId(newEntity.getModelName(), newEntity.getBrand().getId())) {
            Model existed = modelRepository
                    .findByModelNameAndBrandId(
                            newEntity.getModelName(), newEntity.getBrand().getId()
                    ).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(ModelRequest.class, "modelName & brandName", newEntity.getModelName());
        }
        return super.updateById(id, newEntity);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Model model = this.findById(id);
        // Delete all association first
        for (Product p : model.getProducts())
            model.removeProduct(p);
        super.deleteById(id);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Map<String, Object> response = super.findAllPaging(page, size);
        List<Model> models = (List<Model>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toModelDTOs(models));

        return response;
    }




    // Many-to-Many Relationship (bonus)
    @Override
    public List<Product> getAllProductsByModelsId(Long modelId) {
        if (!modelRepository.existsById(modelId))
            throw new EntityNotFoundException(Model.class, "modelId", modelId.toString());
        return productRepository.findProductsByModelsId(modelId);
    }
    @Override
    @Transactional
    public void deleteProductFromModel(Long productId, Long modelId) {
        if (!productRepository.existsById(productId))
            throw new EntityNotFoundException(Product.class, "productId", productId.toString());
        Model model = modelRepository.findById(modelId)
                .orElseThrow(() -> new EntityNotFoundException(Model.class, "modelId", modelId.toString()));
        model.removeProduct(productId);
        modelRepository.save(model);
    }
    @Override
    @Transactional
    public Product addProductToModel(Long productId, Long modelId) {
        Product product = modelRepository.findById(modelId)
                .map(model -> {
                    Product _product = productRepository.findById(productId)
                            .orElseThrow(() -> new EntityNotFoundException(Product.class, "productId", productId.toString()));

                    model.addProduct(_product);
                    modelRepository.save(model);
                    return _product;
                }).orElseThrow(() -> new EntityNotFoundException(Model.class, "modelId", modelId.toString()));
        return product;
    }



    // filter
    @Override
    public List<Model> searchModel(List<SearchCriteria> params) {
        return modelDAO.searchModel(params);
    }
}
